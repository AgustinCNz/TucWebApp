// backend/controllers/landings.controller.js
// -----------------------------------------------------------------------------
// Controladores CRUD para landings.
// -----------------------------------------------------------------------------

import { pool } from '../config/db.js'
import {
  crearLanding,
  obtenerLandingsPorUid
} from '../models/landing.model.js'

/* ─────────────────── Crear ─────────────────── */
export async function handleCrearLanding (req, res) {
  try {
    const nuevaLandingId = await crearLanding(req.body)
    res.status(201).json({ id: nuevaLandingId })
  } catch (error) {
    console.error('Error al crear landing:', error)
    res.status(500).json({ error: 'Error al crear landing' })
  }
}

/* ─────────────────── Listar ─────────────────── */
export async function handleObtenerLandings (req, res) {
  try {
    const { uid } = req.params
    const landings = await obtenerLandingsPorUid(uid)
    res.json(landings)
  } catch (error) {
    console.error('Error al obtener landings:', error)
    res.status(500).json({ error: 'Error al obtener landings' })
  }
}

/* ─────────────────── Actualizar ─────────────────── */
export async function handleActualizarLanding (req, res) {
  const { id } = req.params
  try {
    await pool.query('UPDATE landings SET ? WHERE id = ?', [req.body, id])
    res.json({ message: 'Landing actualizada' })
  } catch (error) {
    console.error('Error al actualizar landing:', error)
    res.status(500).json({ error: 'Error al actualizar landing' })
  }
}

/* ─────────────────── Eliminar ─────────────────── */
export async function eliminarLanding (req, res) {
  const { id } = req.params
  try {
    const [result] = await pool.query('DELETE FROM landings WHERE id = ?', [id])
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Landing no encontrada' })
    }
    res.json({ message: 'Landing eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar landing:', error)
    res.status(500).json({ error: 'Error al eliminar landing' })
  }
}
