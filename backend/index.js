// backend/index.js
// -----------------------------------------------------------------------------
// Punto de entrada del servidor Express. Aquí configuramos middlewares,
// rutas y verificamos la conexión con MySQL. Comentado bloque por bloque
// para que cualquier desarrollador entienda el flujo completo.
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

// Middlewares globales
app.use(cors())          // Por defecto permite cualquier origen → configurar en prod
app.use(express.json())  // Parsea JSON del body a req.body

// ──────────────────────────────────────────────────────────────────────────────
// ► 6. Montaje de rutas
// ──────────────────────────────────────────────────────────────────────────────
app.use('/api/contacto', contactoRoutes)   // → /api/contacto/*
app.use('/api/usuarios', usuariosRoutes)   // → /api/usuarios/*
app.use('/api/landings', landingsRoutes)   // → /api/landings/*

// ──────────────────────────────────────────────────────────────────────────────
// ► 7. Verificación de conexión a MySQL (al arrancar)
// ──────────────────────────────────────────────────────────────────────────────
pool.getConnection()
  .then(() => console.log('✅ Conectado a MySQL correctamente'))
  .catch(err => console.error('❌ Error de conexión MySQL:', err.message))

// ──────────────────────────────────────────────────────────────────────────────
// ► 8. Endpoints extra (quick & dirty)
//    ⚠️  Duplican lógica existente en usuariosRoutes; mantener solo si hace falta
// ──────────────────────────────────────────────────────────────────────────────

// Crear usuario
app.post('/api/usuarios', async (req, res) => {
  const { uid, email } = req.body                 // Desestructuramos payload
  try {
    // Consulta parametrizada para evitar SQL Injection
    await pool.query('INSERT INTO usuarios (uid, email) VALUES (?, ?)', [uid, email])
    res.status(201).json({ message: 'Usuario guardado en base de datos' })
  } catch (error) {
    console.error('Error al guardar usuario:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// Obtener usuario por UID
app.get('/api/usuarios/:uid', async (req, res) => {
  const { uid } = req.params
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE uid = ?', [uid])
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.json(rows[0]) // Devolvemos el registro
  } catch (error) {
    console.error('Error al obtener usuario:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// ──────────────────────────────────────────────────────────────────────────────
// ► 9. Lanzamos el servidor
// ──────────────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})

// Exportamos la app para pruebas unitarias / integración
export default app

// ──────────────────────────────────────────────────────────────────────────────
// ► Sugerencias de mejora
// ──────────────────────────────────────────────────────────────────────────────
//
// 1. Unificar endpoints de usuarios en usuariosRoutes para evitar duplicación y
//    roces con middlewares de validación o autenticación.
// 2. Liberar la conexión de prueba con `conn.release()` para no dejar hilos
//    colgados si reiniciás frecuentemente el servidor en desarrollo.
// 3. Implementar un middleware global de manejo de errores (`errorHandler`) y
//    llamar a `next(err)` desde los controladores.
// 4. Configurar CORS con origenes específicos en producción para mayor seguridad.
// 5. Validar el cuerpo de las peticiones con Joi/Zod o express-validator antes de
//    interactuar con la BD.
//
// -----------------------------------------------------------------------------
