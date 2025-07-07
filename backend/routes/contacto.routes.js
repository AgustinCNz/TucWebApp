import express from 'express'
import { guardarContacto } from '../controllers/contacto.controller.js'

const router = express.Router()

router.post('/', guardarContacto)

export default router
