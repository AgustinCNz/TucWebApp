// backend/models/landing.model.js
import { pool } from '../config/db.js'

export async function crearLanding({ uid, titulo, subtitulo, descripcion, whatsapp, color_fondo, marca_agua }) {
  const [result] = await pool.query(
    'INSERT INTO landings (uid, titulo, subtitulo, descripcion, whatsapp, color_fondo, marca_agua) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [uid, titulo, subtitulo, descripcion, whatsapp, color_fondo, marca_agua]
  )
  return result.insertId
}

export async function obtenerLandingsPorUid(uid) {
  const [rows] = await pool.query('SELECT * FROM landings WHERE uid = ?', [uid])
  return rows
}
