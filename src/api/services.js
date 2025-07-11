const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const handle = async (r) => {
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export const getAll = (uid) => fetch(`${API}/services?uid=${uid}`).then(handle)

export const create = (data) =>
  fetch(`${API}/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handle)

export const update = (id, data) =>
  fetch(`${API}/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handle)

export const remove = (id) =>
  fetch(`${API}/services/${id}`, { method: 'DELETE' }).then(handle)
