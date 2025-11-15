// js/supabase-api.js
// Auto-generated Supabase helper - UniVerse project
const SUPABASE_URL = "https://ubruufgjtehqcykjmrce.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVicnV1ZmdqdGVocWN5a2ptcmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMTA2NjMsImV4cCI6MjA3ODc4NjY2M30.5RwJbzT1kGvvkVWIdPibP12Pj6A30obWjG23og7olns";

const SUPABASE_HEADERS = {
  "apikey": SUPABASE_ANON_KEY,
  "Authorization": `Bearer ${
    SUPABASE_ANON_KEY
  }`,
  "Content-Type": "application/json"
};

// Basic REST helpers for Supabase
async function supabaseGet(table, params = "") {
  const url = `${SUPABASE_URL}/rest/v1/${table}${params}`;
  const res = await fetch(url, { headers: SUPABASE_HEADERS });
  if (!res.ok) throw new Error(`GET ${table} failed: ${res.status}`);
  return res.json();
}

async function supabasePost(table, bodyObj) {
  const url = `${SUPABASE_URL}/rest/v1/${table}`;
  const res = await fetch(url, {
    method: "POST",
    headers: SUPABASE_HEADERS,
    body: JSON.stringify(bodyObj)
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`POST ${table} failed: ${res.status} ${txt}`);
  }
  return res.json();
}

async function supabasePatch(table, id, bodyObj) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: SUPABASE_HEADERS,
    body: JSON.stringify(bodyObj)
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`PATCH ${table} failed: ${res.status} ${t}`);
  }
  return res.json();
}

async function supabaseDelete(table, id) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: SUPABASE_HEADERS
  });
  if (!res.ok) throw new Error(`DELETE ${table} failed: ${res.status}`);
  return res.json();
}
