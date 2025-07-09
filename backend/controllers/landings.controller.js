// backend/controllers/landings.controller.js
import { crearLanding, obtenerLandingsPorUid } from '../models/landing.model.js'

export async function handleCrearLanding(req, res) {
  try {
    const nuevaLanding = await crearLanding(req.body)
    res.status(201).json({ id: nuevaLanding })
  } catch (error) {
    console.error('Error al crear landing:', error.message)
    res.status(500).json({ error: 'Error al crear landing' })
  }
}

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
