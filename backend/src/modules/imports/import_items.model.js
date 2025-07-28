// backend/src/modules/imports/import_items.model.js
import { pool } from '../../config/db.js'

/**
 * Inserta un nuevo ítem de importación.
 * @param {Object} data 
 * @returns {Promise<number>} insertId
 */
export async function createItem(data) {
  const {
    import_id,
    concepto,
    cantidad,
    precio_usd,
    tracking,
    link_url
  } = data

  const [result] = await pool.query(
    `INSERT INTO import_items
       (import_id, concepto, cantidad, precio_usd, tracking, link_url)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [import_id, concepto, cantidad, precio_usd, tracking, link_url]
  )
  // devuelve el ID del registro creado
  return result.insertId
}

/**
 * Agrega una URL de imagen a un ítem existente.
 * @param {number} itemId 
 * @param {string} url 
 */
export async function addItemImage(itemId, url) {
  const [result] = await pool.query(
    `INSERT INTO import_item_images (item_id, url) VALUES (?, ?)`,
    [itemId, url]
  )
  return result.insertId
}

/**
 * Devuelve un ítem junto con todas sus imágenes.
 * @param {number} itemId 
 * @returns {Promise<Object>}
 */
export async function getItemWithImages(itemId) {
  // Trae los datos del ítem
  const [[item]] = await pool.query(
    `SELECT * FROM import_items WHERE id = ?`,
    [itemId]
  )
  // Trae las imágenes asociadas
  const [images] = await pool.query(
    `SELECT id, url FROM import_item_images WHERE item_id = ?`,
    [itemId]
  )
  // Devuelve un objeto con ítem + array de imágenes
  return { ...item, images }
}
