// backend/config/db.js
// -----------------------------------------------------------------------------
// Configuración y creación de un pool de conexiones MySQL usando mysql2/promise.
// Este pool se reutiliza en toda la app para evitar abrir/cerrar conexiones
// constantemente y así mejorar el rendimiento.
// -----------------------------------------------------------------------------

import mysql from 'mysql2/promise'   // Driver MySQL con soporte Promises
import dotenv from 'dotenv'          // Carga variables de entorno desde .env

dotenv.config() // Hace disponibles las claves definidas en .env en process.env

// createPool devuelve un objeto con métodos .query(), .getConnection(), etc.
// Cada parámetro puede sobreescribirse con variables de entorno para separar
// config de código.
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',   // Host de la BD
  user: process.env.DB_USER || 'root',        // Usuario
  password: process.env.DB_PASSWORD || '',    // Contraseña
  database: process.env.DB_NAME || 'tucwebapp', // Nombre de la BD
  waitForConnections: true,  // Hace que las peticiones esperen si no hay conex libres
  connectionLimit: 10,       // Máximo de conexiones simultáneas en el pool
  queueLimit: 0              // 0 = ilimitado; cola de peticiones cuando no hay conex
})


// Sugerencias

// Guardar parámetros sensibles (host, user, pass) siempre en .env.

// Ajustar connectionLimit según tamaño de la app y recursos del servidor.

// Considerar namedPlaceholders: true para consultas más legibles.