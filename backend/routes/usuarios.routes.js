// backend/routes/usuarios.routes.js
// -----------------------------------------------------------------------------
// Rutas de usuarios: registro y obtención por UID.
// -----------------------------------------------------------------------------

import express from 'express'
import { registrarUsuario } from '../controllers/usuarios.controller.js'
import { pool } from '../config/db.js' // Usamos el pool para consultar MySQL

const router = express.Router()

// POST /api/usuarios
// Registra un nuevo usuario (delegado al controlador).
router.post('/', registrarUsuario)

// GET /api/usuarios/:uid
// Devuelve un usuario por UID (Firebase). Implementado inline aquí.
router.get('/:uid', async (req, res) => {
  const { uid } = req.params                 // UID del path
  try {
    // Consulta parametrizada → protege contra SQL Injection
    const [result] = await pool.query(
      'SELECT * FROM usuarios WHERE uid = ?',
      [uid]
    )

    if (result.length === 0)
      return res.status(404).json({ message: 'Usuario no encontrado' })

    res.json(result[0])                      // Enviamos el usuario encontrado
  } catch (error) {
    console.error('Error al obtener usuario:', error.message)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

export default router
// Sugerencias

// Mover el GET a un controlador (usuarios.controller.js) para mantener
// consistencia con el resto de la app.

// Aplicar un validador de uid (por ejemplo, debe ser un string alfanumérico
// de 28 caracteres si viene de Firebase).

// Considerar agregar paginación y filtros si el listado de usuarios crece.