// src/services/api.js
// -----------------------------------------------------------------------------
// Módulo centralizado de llamadas HTTP desde el front-end al backend.
// -----------------------------------------------------------------------------

const API_URL = 'http://localhost:3000/api'   // Cambiá en producción

/* Utilidad: maneja respuestas HTTP */
async function handleResponse (res) {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Error en la solicitud')
  }
  return res.json()
}

/* ──────────────── CONTACTO ──────────────── */
export async function enviarContacto (data) {
  const res = await fetch(`${API_URL}/contacto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return handleResponse(res)
}

/* ──────────────── USUARIOS ──────────────── */
export async function registrarUsuarioDB ({ uid, email, plan = 'free' }) {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, email, plan })
  })
  return handleResponse(res)
}

export async function obtenerUsuario (uid) {
  const res = await fetch(`${API_URL}/usuarios/${uid}`)
  return handleResponse(res)
}

export async function actualizarUsuario (uid, data) {
  const res = await fetch(`${API_URL}/usuarios/${uid}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return handleResponse(res)
}

/* ──────────────── LANDINGS ──────────────── */
export async function crearLanding (data) {
  const res = await fetch(`${API_URL}/landings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return handleResponse(res)
}

export async function obtenerLandings (uid) {
  const res = await fetch(`${API_URL}/landings/${uid}`)
  return handleResponse(res)
}

export async function obtenerLandingPorId (id) {
  const res = await fetch(`${API_URL}/landings/${id}`)
  return handleResponse(res)
}

export async function actualizarLanding (id, data) {
  const res = await fetch(`${API_URL}/landings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return handleResponse(res)
}

export async function eliminarLanding (id) {
  const res = await fetch(`${API_URL}/landings/${id}`, { method: 'DELETE' })
  return handleResponse(res)
}
