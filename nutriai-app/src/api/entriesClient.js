import { API_BASE_URL, isElectron } from './config';

// --- Electron-specific local storage functions ---
// We need to access Node's 'fs' and 'path' modules when in Electron
const fs = isElectron() ? window.require('fs') : null;
const path = isElectron() ? window.require('path') : null;
const appData = isElectron() ? window.require('electron').remote.app.getPath('userData') : null;

const getLocalEntriesPath = () => path.join(appData, 'nutriai-entries.json');

const readLocalEntries = () => {
  if (!isElectron()) return [];
  const filePath = getLocalEntriesPath();
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } 
  return [];
};

const writeLocalEntries = (entries) => {
  if (!isElectron()) return;
  fs.writeFileSync(getLocalEntriesPath(), JSON.stringify(entries, null, 2));
};

// --- Universal API Client ---

function getToken() {
  return localStorage.getItem('nutriai.token');
}

export async function saveEntry(entry) {
  if (isElectron()) {
    const entries = readLocalEntries();
    const newEntries = [...entries, { ...entry, id: Date.now() }];
    writeLocalEntries(newEntries);
    return { saved: entry, entries: newEntries };
  }

  // Web version
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}/api/entries`, {
    method: 'POST',
    headers,
    body: JSON.stringify(entry),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const saved = await res.json();
  const allEntries = await listEntries(); // Refetch all entries
  return { saved, entries: allEntries };
}

export async function listEntries() {
  if (isElectron()) {
    return readLocalEntries();
  }
  
  // Web version
  const token = getToken();
  const headers = {};
  let url = `${API_BASE_URL}/api/entries`;

  if (token) {
    try {
      const profileId = JSON.parse(atob(token.split('.')[1])).profile_id;
      headers['Authorization'] = `Bearer ${token}`;
      url += `?profile_id=${profileId}`;
    } catch (e) {
      console.error('Invalid token', e);
    }
  }

  const res = await fetch(url, { headers });
  if (res.ok) {
    return await res.json();
  }
  return [];
}
