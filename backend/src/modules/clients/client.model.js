// backend/src/modules/clients/client.model.js
// -----------------------------------------------------------------------------
// Acceso a datos para la tabla `clients`.
// Todas las consultas devuelven un array [rows] o el insertId.
// -----------------------------------------------------------------------------

import { pool } from '../../config/db.js'

/* ───────────────────────── CRUD ───────────────────────── */
export async function createClient ({ uid_owner, nombre, email, telefono, nota }) {
  const [result] = await pool.query(
    `INSERT INTO clients (uid_owner, nombre, email, telefono, nota)
     VALUES (?, ?, ?, ?, ?)`,
    [uid_owner, nombre, email, telefono, nota]
  )
  return result.insertId
}

export async function getClientsByOwner (uid_owner) {
  const [rows] = await pool.query(
    'SELECT * FROM clients WHERE uid_owner = ? ORDER BY created_at DESC',
    [uid_owner]
  )
  return rows
}

export async function getClientById (id) {
  const [rows] = await pool.query('SELECT * FROM clients WHERE id = ?', [id])
  return rows[0] || null
}

export async function updateClient (id, payload) {
  const [result] = await pool.query(
    'UPDATE clients SET ? WHERE id = ?',
    [payload, id]
  )
  return result.affectedRows
}

export async function deleteClient (id) {
  const [result] = await pool.query('DELETE FROM clients WHERE id = ?', [id])
  return result.affectedRows
}
