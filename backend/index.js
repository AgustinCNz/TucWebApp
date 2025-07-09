// backend/index.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import contactoRoutes from './routes/contacto.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import landingsRoutes from './routes/landings.routes.js'
import { pool } from './config/db.js'


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/contacto', contactoRoutes)
app.use('/api/usuarios', usuariosRoutes)
app.use('/api/landings', landingsRoutes)

// Prueba conexión MySQL
pool.getConnection()
  .then(() => console.log('✅ Conectado a MySQL correctamente'))
  .catch(err => console.error('❌ Error de conexión MySQL:', err.message))

// Endpoints extra
app.post('/api/usuarios', async (req, res) => {
  const { uid, email } = req.body
  try {
    await pool.query('INSERT INTO usuarios (uid, email) VALUES (?, ?)', [uid, email])
    res.status(201).json({ message: 'Usuario guardado en base de datos' })
  } catch (error) {
    console.error('Error al guardar usuario:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

app.get('/api/usuarios/:uid', async (req, res) => {
  const { uid } = req.params
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE uid = ?', [uid])
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.json(rows[0])
  } catch (error) {
    console.error('Error al obtener usuario:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
// Exportar la aplicación para pruebas