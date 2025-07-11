// backend/src/modules/finances/finance.model.js
import { pool } from '../../config/db.js'

export async function createMovement ({
  uid_owner,
  tipo,               // ingreso | egreso
  categoria,
  monto,
  fecha,
  servicio_id = null, // puede ser null
  nota = ''
}) {
  const [r] = await pool.query(
    `INSERT INTO finances
       (uid_owner,tipo,categoria,monto,fecha,servicio_id,nota)
     VALUES (?,?,?,?,?,?,?)`,
    [uid_owner, tipo, categoria, monto, fecha, servicio_id, nota]
  )
  return r.insertId
}

export async function getMovements ({
  uid_owner,
  month,
  year,
  categoria
}) {
  let sql = 'SELECT * FROM finances WHERE uid_owner = ?'
  const params = [uid_owner]

  if (year) {
    sql += ' AND YEAR(fecha) = ?'
    params.push(year)
  }
  if (month) {
    sql += ' AND MONTH(fecha) = ?'
    params.push(month)
  }
  if (categoria) {
    sql += ' AND categoria = ?'
    params.push(categoria)
  }
  sql += ' ORDER BY fecha DESC'

  const [rows] = await pool.query(sql, params)
  return rows
}

export async function updateMovement (id, payload) {
  const [r] = await pool.query('UPDATE finances SET ? WHERE id = ?', [payload, id])
  return r.affectedRows
}

export async function deleteMovement (id) {
  const [r] = await pool.query('DELETE FROM finances WHERE id = ?', [id])
  return r.affectedRows
}
