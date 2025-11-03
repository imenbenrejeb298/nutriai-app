const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db, addEntry, listEntries, createUser, findUserByEmail, getUserById } = require('./db');
const { generateMockPlan } = require('./mock-ai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_production';

app.post('/api/generate-meal-plan', async (req, res) => {
  const profile = req.body || {};
  try {
    const plan = generateMockPlan(profile);
    return res.json(plan);
  } catch (err) {
    console.error('Error during mock generation flow:', err);
    return res.status(500).json({ error: 'Mock AI backend error' });
  }
});

// Authentication routes...
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const existing = await findUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'User already exists' });

    const profileStmt = `INSERT INTO profiles (name, data) VALUES (?, ?)`;
    const profileData = JSON.stringify({ createdFrom: 'register' });
    const profileResult = await new Promise((resolve, reject) => {
      const stmt = db.prepare(profileStmt);
      stmt.run(name || null, profileData, function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID });
      });
    });

    const pwHash = await bcrypt.hash(password, 10);
    const user = await createUser(email, pwHash, profileResult.id);
    const token = jwt.sign({ sub: user.id, profile_id: profileResult.id }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, profile_id: profileResult.id });
  } catch (err) {
    console.error('Register error', err);
    res.status(500).json({ error: 'register failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'invalid credentials' });
    const ok = await bcrypt.compare(password, user.password_hash || '');
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });
    const token = jwt.sign({ sub: user.id, profile_id: user.profile_id }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, profile_id: user.profile_id });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ error: 'login failed' });
  }
});

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return next();
  const parts = auth.split(' ');
  if (parts.length !== 2) return next();
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {}
  return next();
}
app.use(authenticate);

// Entries endpoints...
app.post('/api/entries', async (req, res) => {
  const entry = req.body || {};
  if (!entry.date) entry.date = new Date().toISOString().slice(0, 10);
  try {
    if (req.user && req.user.profile_id) entry.profile_id = req.user.profile_id;
    const result = await addEntry(entry);
    res.json({ success: true, id: result.id });
  } catch (err) {
    console.error('Failed to save entry', err);
    res.status(500).json({ error: 'Failed to save entry' });
  }
});

app.get('/api/entries', async (req, res) => {
  const profile_id = req.query.profile_id || null;
  try {
    const rows = await listEntries(profile_id);
    res.json(rows);
  } catch (err) {
    console.error('Failed to list entries', err);
    res.status(500).json({ error: 'Failed to list entries' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`NutriAI server listening on port ${PORT}`);
});
