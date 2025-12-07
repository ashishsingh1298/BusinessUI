// app.js - common helpers for pages
const API_BASE = "https://businessapi-njcw.onrender.com/api";

function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { "Content-Type": "application/json", "Authorization": "Bearer " + token } :
                 { "Content-Type": "application/json" };
}

async function fetchJson(url, opts = {}) {
  const res = await fetch(url, opts);
  const text = await res.text();
  try { return { ok: res.ok, status: res.status, data: text ? JSON.parse(text) : null }; }
  catch (e) { return { ok: res.ok, status: res.status, data: text }; }
}

function requireAuthRedirect() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

function logoutAndRedirect() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
