import express from 'express'
import { registrarUsuario } from '../controllers/usuarios.controller.js'
import { pool } from '../config/db.js'
// Importa las dependencias necesarias
// Express para manejar las rutas

const router = express.Router()
router.post('/', registrarUsuario)

router.get('/:uid', async (req, res) => {
  const { uid } = req.params
  try {
    const [result] = await pool.query('SELECT * FROM usuarios WHERE uid = ?', [uid])
    if (result.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' })
    res.json(result[0])
  } catch (error) {
    console.error('Error al obtener usuario:', error.message)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})
// Define una ruta para registrar un nuevo usuario
// Esta ruta recibe un UID y un email, y guarda el usuario en la base de datos

router.put('/:uid', async (req, res) => {
  const { uid } = req.params
  const { plan } = req.body

  try {
    await pool.query('UPDATE usuarios SET plan = ? WHERE uid = ?', [plan, uid])
    res.json({ message: 'Usuario actualizado' })
  } catch (error) {
    console.error('Error al actualizar usuario:', error.message)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})
// Exporta el router para usarlo en el servidor principal
// Esto permite que las rutas definidas aquí estén disponibles en el servidor

export default router
