import { pool } from '../config/db.js'

export const guardarContacto = async (req, res) => {
  const { nombre, email, whatsapp, mensaje } = req.body

  try {
    const [result] = await pool.query(
      'INSERT INTO contactos (nombre, email, whatsapp, mensaje) VALUES (?, ?, ?, ?)',
      [nombre, email, whatsapp, mensaje]
    )

    res.status(200).json({ mensaje: 'Contacto guardado', id: result.insertId })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al guardar contacto' })
  }
}
