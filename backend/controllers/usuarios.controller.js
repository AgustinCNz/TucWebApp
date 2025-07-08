import { pool } from '../config/db.js'

export const registrarUsuario = async (req, res) => {
  const { uid, email, plan } = req.body

  try {
    const [existing] = await pool.query('SELECT * FROM usuarios WHERE uid = ?', [uid])
    if (existing.length > 0) {
      return res.status(200).json({ mensaje: "Usuario ya registrado" })
    }

    await pool.query('INSERT INTO usuarios (uid, email, plan) VALUES (?, ?, ?)', [uid, email, plan || 'free'])
    res.status(201).json({ mensaje: "Usuario registrado localmente" })
  } catch (error) {
    console.error("Error al registrar en base de datos:", error)
    res.status(500).json({ error: "Error al guardar en base de datos" })
  }
}
export const obtenerUsuario = async (req, res) => {
  const { uid } = req.params

  try {
    const [usuario] = await pool.query('SELECT * FROM usuarios WHERE uid = ?', [uid])
    if (usuario.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" })
    }

    res.status(200).json(usuario[0])
  } catch (error) {
    console.error("Error al obtener usuario:", error)
    res.status(500).json({ error: "Error al obtener usuario" })
  }
}