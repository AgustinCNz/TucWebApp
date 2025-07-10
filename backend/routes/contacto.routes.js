// backend/routes/contacto.routes.js
// -----------------------------------------------------------------------------
// Rutas relacionadas con el formulario de contacto.
// Solo una ruta POST → /api/contacto/
// -----------------------------------------------------------------------------

import express from 'express'
import { guardarContacto } from '../controllers/contacto.controller.js' // Acción

const router = express.Router()

// POST /api/contacto
// ──────────────────
// Recibe los datos del form (nombre, email, mensaje, etc.)
// y delega la lógica a guardarContacto.
router.post('/', guardarContacto)

export default router


// Sugerencias

// Añadí validación de datos (Joi, Zod o express-validator) antes de guardarContacto.

// Podría sumarse un rate-limit middleware para evitar spam (ej. express-rate-limit).