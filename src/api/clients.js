// src/api/clients.js
const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

async function handle (res) {
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export const getAll = uid =>
  fetch(`${API}/clients?uid=${uid}`).then(handle)

export const create = data =>
  fetch(`${API}/clients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handle)

export const update = (id, data) =>
  fetch(`${API}/clients/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handle)

export const remove = id =>
  fetch(`${API}/clients/${id}`, { method: 'DELETE' }).then(handle)
