// backend/controllers/usuarios.controller.js
// -----------------------------------------------------------------------------
// Controladores para registrar y obtener usuarios.
// -----------------------------------------------------------------------------

import { pool } from '../config/db.js'

// ──────────────────────────────────────────────────────────────────────────────
// Registrar usuario
// ──────────────────────────────────────────────────────────────────────────────
export const registrarUsuario = async (req, res) => {
  const { uid, email, plan = 'free' } = req.body
try { 
  const [result] = await pool.query( 'INSERT INTO usuarios (uid, email, plan) VALUES (?, ?, ?)', [uid, email, plan]
);
res.status(201).json({ uid, email, plan });
} catch (error) {
  console.error("Error al registrar usuario:", error.mensaje);
  res.status(500).json({ error: "No se pudo registrar el usuario" });
};

  try {
    // Verificamos si el usuario ya existe
    const [existing] = await pool.query(
      'SELECT * FROM usuarios WHERE uid = ?',
      [uid]
    )

    if (existing.length > 0) {
      // 200 OK porque no es un error, pero ya existe
      return res.status(200).json({ mensaje: 'Usuario ya registrado' })
    }

    // Insertamos con plan por defecto 'free'
    await pool.query(
      'INSERT INTO usuarios (uid, email, plan) VALUES (?, ?, ?)',
      [uid, email, plan || 'free']
    )

    res.status(201).json({ mensaje: 'Usuario registrado localmente' })
  } catch (error) {
    console.error('Error al registrar en base de datos:', error)
    res.status(500).json({ error: 'Error al guardar en base de datos' })
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Obtener usuario por UID
// ──────────────────────────────────────────────────────────────────────────────
export const obtenerUsuario = async (req, res) => {
  const { uid } = req.params

  try {
    const [usuario] = await pool.query(
      'SELECT * FROM usuarios WHERE uid = ?',
      [uid]
    )

    if (usuario.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.status(200).json(usuario[0])
  } catch (error) {
    console.error('Error al obtener usuario:', error)
    res.status(500).json({ error: 'Error al obtener usuario' })
  }
}


// Sugerencias

// Validación: asegurar formato de uid y email.

// Índice único: en la tabla usuarios, definir uid UNIQUE para evitar
// duplicados incluso en race conditions.

// JWT / Firebase ID token: validar token antes de registrar/consultar.