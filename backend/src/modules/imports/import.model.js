// backend/src/modules/imports/import.model.js
import { pool } from '../../config/db.js'

export async function createImport ({
  client_id,
  pedido,
  tracking,
  costo_usd = 0,
  margen_usd = 0,
  estado = 'en_camino'
}) {
  const [r] = await pool.query(
    `INSERT INTO imports
       (client_id, pedido, tracking, costo_usd, margen_usd, estado)
     VALUES (?,?,?,?,?,?)`,
    [client_id, pedido, tracking, costo_usd, margen_usd, estado]
  )
  return r.insertId
}

export async function getImportsByOwner (uid_owner) {
  const [rows] = await pool.query(
    `SELECT i.*, c.nombre AS cliente
       FROM imports i
       JOIN clients c ON c.id = i.client_id
      WHERE c.uid_owner = ?
   ORDER BY i.created_at DESC`,
    [uid_owner]
  )
  return rows
}

export async function updateImport (id, payload) {
  const [r] = await pool.query('UPDATE imports SET ? WHERE id = ?', [payload, id])
  return r.affectedRows
}

export async function deleteImport (id) {
  const [r] = await pool.query('DELETE FROM imports WHERE id = ?', [id])
  return r.affectedRows
}
