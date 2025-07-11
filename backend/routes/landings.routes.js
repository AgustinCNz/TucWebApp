// backend/routes/landings.routes.js
// -----------------------------------------------------------------------------
// Rutas CRUD de landings.
// -----------------------------------------------------------------------------

import express from 'express'
import {
  handleCrearLanding,        // POST    /api/landings
  handleObtenerLandings,     // GET     /api/landings/:uid
  handleActualizarLanding,   // PUT     /api/landings/:id
  eliminarLanding            // DELETE  /api/landings/:id
} from '../controllers/landings.controller.js'

const router = express.Router()

router.post('/', handleCrearLanding)          // Crear
router.get('/:uid', handleObtenerLandings)    // Listar por UID
router.put('/:id', handleActualizarLanding)   // Actualizar por ID
router.delete('/:id', eliminarLanding)        // Eliminar por ID

export default router   // 👈  ESTE ES EL EXPORT QUE INDEX.JS NECESITA
