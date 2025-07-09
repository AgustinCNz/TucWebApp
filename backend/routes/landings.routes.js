// backend/routes/landings.routes.js
import express from 'express'
import { handleCrearLanding, handleObtenerLandings } from '../controllers/landings.controller.js'

const router = express.Router()

router.post('/', handleCrearLanding)
router.get('/:uid', handleObtenerLandings)

export default router
