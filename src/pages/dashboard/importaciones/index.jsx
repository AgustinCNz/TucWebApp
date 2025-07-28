// src/api/import_items.js
// -----------------------------------------------------------------------------
// Funciones para consumir el API REST de /api/import_items
// -----------------------------------------------------------------------------

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * Crea un nuevo ítem (sin imágenes) para una importación.
 * @param {{ import_id:number, concepto:string, cantidad:number,
 *          precio_usd:number, tracking?:string, link_url?:string }} data
 * @returns {Promise<{id:number}>} el ID del ítem creado
 */
export async function createImportItem(data) {
  const res = await fetch(`${API_BASE}/import_items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Error al crear ítem')
  return res.json() // { id }
}

/**
 * Sube las imágenes adjuntas al ítem recién creado.
 * @param {number} itemId
 * @param {File[]} files
 * @returns {Promise<{urls:string[]}>} URLs de las imágenes subidas
 */
export async function uploadImportItemImages(itemId, files) {
  const form = new FormData()
  files.forEach(file => form.append('images', file))
  const res = await fetch(`${API_BASE}/import_items/${itemId}/images`, {
    method: 'POST',
    body: form
  })
  if (!res.ok) throw new Error('Error al subir imágenes')
  return res.json() // { urls: [...] }
}

/**
 * Obtiene un ítem junto con sus imágenes.
 * @param {number} itemId
 * @returns {Promise<{
 *   id:number, import_id:number, concepto:string, cantidad:number,
 *   precio_usd:number, tracking:string, link_url:string,
 *   images:{id:number,url:string}[]
 * }>}
 */
export async function getImportItem(itemId) {
  const res = await fetch(`${API_BASE}/import_items/${itemId}`)
  if (!res.ok) throw new Error('Error al obtener ítem')
  return res.json()
}
