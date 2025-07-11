const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const handle = r => (!r.ok ? Promise.reject(r.text()) : r.json())

export const getAll = uid =>
  fetch(`${API}/imports?uid=${uid}`).then(handle)

export const create = data =>
  fetch(`${API}/imports`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handle)

export const update = (id, data) =>
  fetch(`${API}/imports/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handle)

export const remove = id =>
  fetch(`${API}/imports/${id}`, { method: 'DELETE' }).then(handle)
