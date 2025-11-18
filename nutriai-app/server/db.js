const path = require('path');
const fs = require('fs');

// Data directory
const DB_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
const DB_PATH = path.join(DB_DIR, 'nutriai.db');

let usingSqlite = false;
let db = null;

// Try to load sqlite3; if not available (packaged without native), fall back to a simple JSON store.
try {
  const sqlite3 = require('sqlite3').verbose();
  db = new sqlite3.Database(DB_PATH);
  usingSqlite = true;

  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      data TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password_hash TEXT,
      profile_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

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
} catch (err) {
  // eslint-disable-next-line no-console
  console.warn('sqlite3 not available, using JSON fallback for DB. Some features may be limited.');
}

// JSON fallback helpers
const JSON_DB_PATH = path.join(DB_DIR, 'mock_db.json');
function readJsonDb() {
  if (!fs.existsSync(JSON_DB_PATH)) return { profiles: [], users: [], entries: [], lastIds: { profiles: 0, users: 0, entries: 0 } };
  try {
    return JSON.parse(fs.readFileSync(JSON_DB_PATH, 'utf8')) || { profiles: [], users: [], entries: [], lastIds: { profiles: 0, users: 0, entries: 0 } };
  } catch (e) {
    return { profiles: [], users: [], entries: [], lastIds: { profiles: 0, users: 0, entries: 0 } };
  }
}

function writeJsonDb(obj) {
  fs.writeFileSync(JSON_DB_PATH, JSON.stringify(obj, null, 2), 'utf8');
}

// API functions (unified interface whether using sqlite or JSON fallback)
function addEntry(entry) {
  if (usingSqlite) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`INSERT INTO entries (profile_id, date, weight, calories_consumed, activity_minutes, notes) VALUES (?, ?, ?, ?, ?, ?)`);
      stmt.run(entry.profile_id || null, entry.date, entry.weight || null, entry.calories_consumed || null, entry.activity_minutes || null, entry.notes || null, function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID });
      });
    });
  }

  return new Promise((resolve) => {
    const dbObj = readJsonDb();
    const id = (dbObj.lastIds.entries || 0) + 1;
    dbObj.lastIds.entries = id;
    const e = {
      id,
      profile_id: entry.profile_id || null,
      date: entry.date || new Date().toISOString().slice(0, 10),
      weight: entry.weight || null,
      calories_consumed: entry.calories_consumed || null,
      activity_minutes: entry.activity_minutes || null,
      notes: entry.notes || null,
      created_at: new Date().toISOString()
    };
    dbObj.entries.push(e);
    writeJsonDb(dbObj);
    resolve({ id });
  });
}

function listEntries(profile_id) {
  if (usingSqlite) {
    return new Promise((resolve, reject) => {
      const sql = profile_id ? `SELECT * FROM entries WHERE profile_id = ? ORDER BY date ASC` : `SELECT * FROM entries ORDER BY date ASC`;
      const params = profile_id ? [profile_id] : [];
      db.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  return new Promise((resolve) => {
    const dbObj = readJsonDb();
    const rows = profile_id ? dbObj.entries.filter(r => r.profile_id == profile_id) : dbObj.entries.slice();
    // sort by date asc if date exists
    rows.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    resolve(rows);
  });
}

function createUser(email, passwordHash, profileId) {
  if (usingSqlite) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`INSERT INTO users (email, password_hash, profile_id) VALUES (?, ?, ?)`);
      stmt.run(email, passwordHash, profileId || null, function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID });
      });
    });
  }

  return new Promise((resolve, reject) => {
    const dbObj = readJsonDb();
    if (dbObj.users.find(u => u.email === email)) return reject(new Error('Email already exists'));
    const id = (dbObj.lastIds.users || 0) + 1;
    dbObj.lastIds.users = id;
    const u = { id, email, password_hash: passwordHash, profile_id: profileId || null, created_at: new Date().toISOString() };
    dbObj.users.push(u);
    writeJsonDb(dbObj);
    resolve({ id });
  });
}

function findUserByEmail(email) {
  if (usingSqlite) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  return new Promise((resolve) => {
    const dbObj = readJsonDb();
    const u = dbObj.users.find(x => x.email === email) || null;
    resolve(u);
  });
}

function getUserById(id) {
  if (usingSqlite) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  return new Promise((resolve) => {
    const dbObj = readJsonDb();
    const u = dbObj.users.find(x => x.id == id) || null;
    resolve(u);
  });
}

module.exports = { addEntry, listEntries, createUser, findUserByEmail, getUserById };
