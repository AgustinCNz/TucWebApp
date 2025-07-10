// backend/controllers/landings.controller.js
// -----------------------------------------------------------------------------
// Controladores para CRUD de landings.
// -----------------------------------------------------------------------------

import {
  crearLanding,
  obtenerLandingsPorUid
} from '../models/landing.model.js'

import { pool } from '../config/db.js' // Sólo necesario para eliminarLanding

// ──────────────────────────────────────────────────────────────────────────────
// Crear landing
// ──────────────────────────────────────────────────────────────────────────────
export async function handleCrearLanding(req, res) {
  try {
    // crearLanding devuelve el ID insertado
    const nuevaLandingId = await crearLanding(req.body)
    res.status(201).json({ id: nuevaLandingId })
  } catch (error) {
    console.error('Error al crear landing:', error.message)
    res.status(500).json({ error: 'Error al crear landing' })
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Obtener landings por UID
// ──────────────────────────────────────────────────────────────────────────────
export async function handleObtenerLandings(req, res) {
  try {
    const { uid } = req.params
    const landings = await obtenerLandingsPorUid(uid)
    res.json(landings)
  } catch (error) {
    console.error('Error al obtener landings:', error.message)
    res.status(500).json({ error: 'Error al obtener landings' })
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Eliminar landing por ID
// ──────────────────────────────────────────────────────────────────────────────
export const eliminarLanding = async (req, res) => {
  const { id } = req.params
  try {
    // Ejecutamos DELETE parametrizado
    const [result] = await pool.query(
      'DELETE FROM landings WHERE id = ?',
      [id]
    )

    // Si no afectó filas, la landing no existe
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Landing no encontrada' })
    }

    res.json({ message: 'Landing eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar landing:', error)
    res.status(500).json({ error: 'Error al eliminar landing' })
  }
}

// Sugerencias

// Autenticación/Autorización: verificar que el uid de la sesión
// coincida con el propietario de la landing antes de eliminar.

// Transacciones: si eliminás registros relacionados (imágenes, stats),
// usá BEGIN/COMMIT/ROLLBACK.

// Mover eliminarLanding: ya está aquí, así que eliminá el import
// erróneo desde el front-end en routes/landings.routes.js.