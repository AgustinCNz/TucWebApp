// backend/src/modules/services/service.model.js
// -----------------------------------------------------------------------------
// Acceso a datos para la tabla `services`.
// -----------------------------------------------------------------------------

import { pool } from '../../config/db.js'

export async function createService ({
  client_id,
  tipo,
  descripcion,
  estado = 'pendiente'
}) {
  const [result] = await pool.query(
    `INSERT INTO services (client_id, tipo, descripcion, estado)
     VALUES (?, ?, ?, ?)`,
    [client_id, tipo, descripcion, estado]
  )
  return result.insertId
}

export async function getServicesByOwner (uid_owner) {
  // Trae servicios + nombre del cliente
  const [rows] = await pool.query(
    `SELECT s.*, c.nombre AS cliente
     FROM services s
     JOIN clients c ON c.id = s.client_id
     WHERE c.uid_owner = ?
     ORDER BY s.created_at DESC`,
    [uid_owner]
  )
  return rows
}

export async function updateService (id, payload) {
  const [r] = await pool.query('UPDATE services SET ? WHERE id = ?', [payload, id])
  return r.affectedRows
}

export async function deleteService (id) {
  const [r] = await pool.query('DELETE FROM services WHERE id = ?', [id])
  return r.affectedRows
}
