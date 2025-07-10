// src/services/api.js
// -----------------------------------------------------------------------------
// Módulo centralizado para llamadas HTTP al backend.
// Usa Fetch API nativa; podés migrar a Axios o React Query para features extra.
// -----------------------------------------------------------------------------

const API_URL = 'http://localhost:3000/api' // TODO: parametrizar vía env

// Utilidad interna para manejar respuestas HTTP
async function handleResponse (res) {
  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(errorText || 'Error en la solicitud')
  }
  return res.json()
}

// ──────────────────────────────────────────────────────────────────────────────
// Contacto
// ──────────────────────────────────────────────────────────────────────────────
export async function enviarContacto (data) {
  const res = await fetch(`${API_URL}/contacto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return handleResponse(res)
}

// ──────────────────────────────────────────────────────────────────────────────
// Usuarios
// ──────────────────────────────────────────────────────────────────────────────
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

// ──────────────────────────────────────────────────────────────────────────────
// Landings
// ──────────────────────────────────────────────────────────────────────────────
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


// Sugerencias

// DRY: extrae fetch a una función request(method, endpoint, body).

// Env vars: import.meta.env.VITE_API_URL para producción/dev.

// Integra React Query para caching, retries y estados isLoading.

// Manejá expiración de sesión (401) redireccionando al login de forma global.