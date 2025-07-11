// backend/controllers/contacto.controller.js
// -----------------------------------------------------------------------------
// Controlador que gestiona la operación de "Guardar contacto".
// Se encarga de recibir la data desde la ruta, insertarla en MySQL
// y devolver la respuesta correspondiente al cliente.
// -----------------------------------------------------------------------------

import { pool } from '../config/db.js'      // Pool de conexiones MySQL

// Función asíncrona → permite uso de await
export const guardarContacto = async (req, res) => {
  // Desestructuramos los datos del body
  const { nombre, email, whatsapp, mensaje } = req.body

  try {
    // Consulta parametrizada para evitar SQL Injection.
    // pool.query() devuelve [result, fields]; usamos solo result.
    const [result] = await pool.query(
      `INSERT INTO contactos (nombre, email, whatsapp, mensaje)
       VALUES (?, ?, ?, ?)`,
      [nombre, email, whatsapp, mensaje]
    )

    // Devolvemos 200 OK con el ID generado por MySQL
    res.status(200).json({ mensaje: 'Contacto guardado', id: result.insertId })
  } catch (error) {
    console.error(error)                 // Log interno
    res.status(500).json({ error: 'Error al guardar contacto' }) // Respuesta genérica
  }
}

// Sugerencias

// Validación: usar Joi/Zod o express-validator antes de insertar.

// Status code: 201 (Created) sería más semántico que 200.

// Manejo de errores: centralizar con un middleware errorHandler.

