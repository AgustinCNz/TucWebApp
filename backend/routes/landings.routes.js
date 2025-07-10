// backend/routes/landings.routes.js
import express from 'express'
import { handleCrearLanding, handleObtenerLandings } from '../controllers/landings.controller.js'
import { eliminarLanding } from '../../src/services/api.js'

const router = express.Router()

router.post('/', handleCrearLanding)
router.get('/:uid', handleObtenerLandings)
router.delete('/:id', eliminarLanding)

// Exportamos el router para usarlo en el servidor principal
// Esto permite que el servidor principal importe este router y lo use para manejar las rutas de land
export default router
