import { API_BASE_URL } from './config';

/**
 * API client for daily entries.
 */

function getToken() {
  return localStorage.getItem('nutriai.token');
}

export async function saveEntry(entry) {
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
    const serverEntries = await res.json();
    return serverEntries;
  }
  return [];
}
