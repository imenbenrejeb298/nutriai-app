const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const DB_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
const DB_PATH = path.join(DB_DIR, 'nutriai.db');

const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  // profiles table (simple, for future use)
  db.run(`CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    data TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // users table for auth
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password_hash TEXT,
    profile_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // daily entries: each entry belongs to a profileId (nullable for single-user)
  db.run(`CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER,
    date TEXT,
    weight REAL,
    calories_consumed INTEGER,
    activity_minutes INTEGER,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

function addEntry(entry) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`INSERT INTO entries (profile_id, date, weight, calories_consumed, activity_minutes, notes) VALUES (?, ?, ?, ?, ?, ?)`);
    stmt.run(entry.profile_id || null, entry.date, entry.weight || null, entry.calories_consumed || null, entry.activity_minutes || null, entry.notes || null, function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID });
    });
  });
}

function listEntries(profile_id) {
  return new Promise((resolve, reject) => {
    const sql = profile_id ? `SELECT * FROM entries WHERE profile_id = ? ORDER BY date ASC` : `SELECT * FROM entries ORDER BY date ASC`;
    const params = profile_id ? [profile_id] : [];
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function createUser(email, passwordHash, profileId) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`INSERT INTO users (email, password_hash, profile_id) VALUES (?, ?, ?)`);
    stmt.run(email, passwordHash, profileId || null, function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID });
    });
  });
}

function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function getUserById(id) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

module.exports = { db, addEntry, listEntries, createUser, findUserByEmail, getUserById };
