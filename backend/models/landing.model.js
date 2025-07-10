// backend/models/landing.model.js
// -----------------------------------------------------------------------------
// Modelo con funciones de acceso a datos (DAO) para la tabla `landings`.
// -----------------------------------------------------------------------------

import { pool } from '../config/db.js'

// ──────────────────────────────────────────────────────────────────────────────
// Crear landing y devolver ID generado
// ──────────────────────────────────────────────────────────────────────────────
export async function crearLanding({
  uid,
  titulo,
  subtitulo,
  descripcion,
  whatsapp,
  color_fondo,
  marca_agua
}) {
  // Insert parametrizado
  const [result] = await pool.query(
    `INSERT INTO landings
     (uid, titulo, subtitulo, descripcion, whatsapp, color_fondo, marca_agua)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [uid, titulo, subtitulo, descripcion, whatsapp, color_fondo, marca_agua]
  )

  // result.insertId = PK auto-increment
  return result.insertId
}

// ──────────────────────────────────────────────────────────────────────────────
// Obtener todas las landings de un usuario (por uid)
// ──────────────────────────────────────────────────────────────────────────────
export async function obtenerLandingsPorUid(uid) {
  const [rows] = await pool.query(
    'SELECT * FROM landings WHERE uid = ?',
    [uid]
  )
  return rows
}


// Sugerencias

// Paginación: si un usuario puede tener muchas landings, añadí LIMIT/OFFSET
// y parámetros page, pageSize.

// DTO / mapeo: devolver solo campos necesarios al front-end.

// Validación de colores: verificar color_fondo con regex HEX antes de
// insertar para evitar datos inválidos.