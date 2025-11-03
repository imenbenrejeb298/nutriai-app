const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- Database Setup ---
// Important: In a serverless environment, the filesystem is often ephemeral.
// We write the database to /tmp, which is a writable directory on Netlify Functions.
const DB_DIR = '/tmp/data';
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}
const DB_PATH = path.join(DB_DIR, 'nutriai.db');
const db = new sqlite3.Database(DB_PATH);

// Create tables if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, data TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
  db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password_hash TEXT, profile_id INTEGER, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
  db.run(`CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, profile_id INTEGER, date TEXT, weight REAL, calories_consumed INTEGER, activity_minutes INTEGER, notes TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
});

// --- Database Helpers (from db.js) ---
const addEntry = (entry) => new Promise((res, rej) => db.prepare(`INSERT INTO entries (profile_id, date, weight, calories_consumed, activity_minutes, notes) VALUES (?, ?, ?, ?, ?, ?)`).run(entry.profile_id||null, entry.date, entry.weight||null, entry.calories_consumed||null, entry.activity_minutes||null, entry.notes||null, function(err){ if(err) rej(err); else res({id: this.lastID}); }));
const listEntries = (pid) => new Promise((res, rej) => db.all(pid ? `SELECT * FROM entries WHERE profile_id = ? ORDER BY date ASC` : `SELECT * FROM entries ORDER BY date ASC`, pid?[pid]:[], (err, rows) => { if(err) rej(err); else res(rows); }));
const createUser = (email, hash, pid) => new Promise((res, rej) => db.prepare(`INSERT INTO users (email, password_hash, profile_id) VALUES (?, ?, ?)`).run(email, hash, pid||null, function(err){ if(err) rej(err); else res({id: this.lastID}); }));
const findUserByEmail = (email) => new Promise((res, rej) => db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => { if(err) rej(err); else res(row); }));

// --- Mock AI (from mock-ai.js) ---
const { generateMockPlan } = require('../../server/mock-ai.js');

// --- Express App Setup ---
const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'a_super_secret_key_that_should_be_in_env_vars';

// --- API Routes ---
app.post('/api/generate-meal-plan', (req, res) => res.json(generateMockPlan(req.body || {})));

app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    if (await findUserByEmail(email)) return res.status(409).json({ error: 'User already exists' });
    const profileResult = await new Promise((resolve, reject) => db.prepare(`INSERT INTO profiles (name, data) VALUES (?, ?)`).run(name || null, JSON.stringify({}), function(err){ if(err) reject(err); else resolve({id: this.lastID}); }));
    const pwHash = await bcrypt.hash(password, 10);
    const user = await createUser(email, pwHash, profileResult.id);
    const token = jwt.sign({ sub: user.id, profile_id: profileResult.id }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, profile_id: profileResult.id });
  } catch (err) {
    res.status(500).json({ error: 'register failed', details: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash || ''))) return res.status(401).json({ error: 'invalid credentials' });
    const token = jwt.sign({ sub: user.id, profile_id: user.profile_id }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, profile_id: user.profile_id });
  } catch (err) {
    res.status(500).json({ error: 'login failed', details: err.message });
  }
});

const authenticate = (req, res, next) => {
  const auth = req.headers.authorization;
  if(auth) {
    const token = auth.split(' ')[1];
    try { req.user = jwt.verify(token, JWT_SECRET); } catch(err) {}
  }
  next();
}
app.use(authenticate);

app.post('/api/entries', async (req, res) => {
  const entry = req.body || {};
  if (!entry.date) entry.date = new Date().toISOString().slice(0, 10);
  if (req.user && req.user.profile_id) entry.profile_id = req.user.profile_id;
  try {
    const result = await addEntry(entry);
    res.json({ success: true, id: result.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save entry' });
  }
});

app.get('/api/entries', async (req, res) => {
  const profile_id = req.query.profile_id || (req.user ? req.user.profile_id : null);
  try {
    const rows = await listEntries(profile_id);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list entries' });
  }
});

// --- Handler for Netlify ---
// The router replaces the app.listen() call.
const router = express.Router();
router.use('/', app); // Mount the app on the router

module.exports.handler = serverless(router);
