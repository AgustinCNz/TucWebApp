// backend/routes/landings.routes.js
// -----------------------------------------------------------------------------
// Rutas para crear, obtener y eliminar landing pages.
// -----------------------------------------------------------------------------

import express from 'express'
import {
  handleCrearLanding,
  handleObtenerLandings
} from '../controllers/landings.controller.js'

// ⚠️ Importar lógica de eliminación desde el BACKEND, no desde el front-end.
// El import actual apunta a src/services/api.js (código del cliente),
// lo cual rompe la separación de capas.
import { eliminarLanding } from '../../../src/services/api.js'

const router = express.Router()

// POST /api/landings
// Crea una nueva landing.
router.post('/', handleCrearLanding)

// GET /api/landings/:uid
// Devuelve todas las landings de un usuario (por uid de Firebase).
router.get('/:uid', handleObtenerLandings)

// DELETE /api/landings/:id
// Elimina una landing por ID.
router.delete('/:id', eliminarLanding)

export default router


// Sugerencias

// Separación de capas: eliminarLanding debería venir de
// ../controllers/landings.controller.js o un controlador dedicado.
// El front-end jamás debe ser requerido dentro del servidor.

// Añadí middlewares de autenticación/autoriza­ción antes de operaciones sensibles.

// Validar id y uid con un schema para evitar SQL Injection o datos corruptos.