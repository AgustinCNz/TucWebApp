const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const h = (r) => (!r.ok ? Promise.reject(r.text()) : r.json())

export const getAll = (params) => {
  const q = new URLSearchParams(params).toString()
  return fetch(`${API}/finances?${q}`).then(h)
}

export const create  = (data)       => fetch(`${API}/finances`,        { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) }).then(h)
export const update  = (id,data)    => fetch(`${API}/finances/${id}`,  { method:'PUT',  headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) }).then(h)
export const remove  = (id)         => fetch(`${API}/finances/${id}`,  { method:'DELETE' }).then(h)
