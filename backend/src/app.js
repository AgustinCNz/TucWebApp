// backend/src/app.js
// -----------------------------------------------------------------------------
// Punto de entrada del servidor Express. Aquí configuramos middlewares,
// rutas y verificamos la conexión con MySQL.
// -----------------------------------------------------------------------------

// ──────────────────────────────────────────────────────────────────────────────
// ► 1. Dependencias externas
// ──────────────────────────────────────────────────────────────────────────────
import express from 'express'   // Framework minimalista para crear API/servidor
import cors from 'cors'         // Middleware que habilita CORS (peticiones cross-origin)
import dotenv from 'dotenv'     // Carga variables definidas en .env al process.env

// ──────────────────────────────────────────────────────────────────────────────
// ► 2. Rutas de la aplicación (separadas por dominio funcional)
// ──────────────────────────────────────────────────────────────────────────────
import contactoRoutes from './routes/contacto.routes.js'   // Formulario de contacto
import usuariosRoutes from './routes/usuarios.routes.js'   // Gestión de usuarios
import landingsRoutes from './routes/landings.routes.js'   // CRUD de landing pages

// Importar rutas de módulos específicos
import clientRoutes from './modules/clients/client.routes.js'
import serviceRoutes from './modules/services/service.routes.js'
import financeRoutes from './modules/finances/finance.routes.js'
import importRoutes from './modules/imports/import.routes.js'

// ✅ Importar rutas del sub-módulo de ítems de importación
import importItemsRoutes from './modules/imports/import_items.routes.js'

// ──────────────────────────────────────────────────────────────────────────────
// ► 3. Configuración de base de datos (MySQL pool)
// ──────────────────────────────────────────────────────────────────────────────
import { pool } from './config/db.js'

// ──────────────────────────────────────────────────────────────────────────────
// ► 4. Variables de entorno
// ──────────────────────────────────────────────────────────────────────────────
dotenv.config() // Lee .env y expone las keys en process.env

// ──────────────────────────────────────────────────────────────────────────────
// ► 5. Instancia y configuración básica de Express
// ──────────────────────────────────────────────────────────────────────────────
const app = express()

// Middlewares globales\app.use(cors())          // Permite peticiones CORS\app.use(express.json())  // Parsea JSON del body a req.body

// ──────────────────────────────────────────────────────────────────────────────
// ► 6. Montaje de rutas
// ──────────────────────────────────────────────────────────────────────────────
app.use('/api/contacto', contactoRoutes)   // → /api/contacto/*
app.use('/api/usuarios', usuariosRoutes)   // → /api/usuarios/*
app.use('/api/landings', landingsRoutes)   // → /api/landings/*
app.use('/api/clients', clientRoutes)      // → /api/clients/*
app.use('/api/services', serviceRoutes)    // → /api/services/*
app.use('/api/finances', financeRoutes)    // → /api/finances/*
app.use('/api/imports', importRoutes)      // → /api/imports/*
// Montaje del router de ítems de importación
app.use('/api/import_items', importItemsRoutes) // → /api/import_items/*

// ──────────────────────────────────────────────────────────────────────────────
// ► 7. Verificación de conexión a MySQL (al arrancar)
// ──────────────────────────────────────────────────────────────────────────────
pool.getConnection()
  .then(() => console.log('✅ Conectado a MySQL correctamente'))
  .catch(err => console.error('❌ Error de conexión MySQL:', err.message))

// ──────────────────────────────────────────────────────────────────────────────
// ► 8. Endpoints extra (quick & dirty)
// ──────────────────────────────────────────────────────────────────────────────
// (estas rutas duplican lógica de usuariosRoutes; se pueden eliminar si no son necesarias)
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
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json(rows[0])
  } catch (error) {
    console.error('Error al obtener usuario:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// ──────────────────────────────────────────────────────────────────────────────
// ► 9. Lanzamos el servidor
// ──────────────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`))

export default app
