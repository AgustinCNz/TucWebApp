import {
  createMovement,
  getMovements,
  updateMovement,
  deleteMovement
} from './finance.model.js'

export const listFinances = async (req, res) => {
  const rows = await getMovements(req.query) // uid, month, year, categoria
  res.json(rows)
}

export const addFinance = async (req, res) => {
  const id = await createMovement(req.body)
  res.status(201).json({ id })
}

export const editFinance = async (req, res) => {
  const { id } = req.params
  const ok = await updateMovement(id, req.body)
  if (!ok) return res.status(404).json({ msg: 'No encontrado' })
  res.json({ msg: 'Actualizado' })
}

export const removeFinance = async (req, res) => {
  const { id } = req.params
  const ok = await deleteMovement(id)
  if (!ok) return res.status(404).json({ msg: 'No encontrado' })
  res.json({ msg: 'Eliminado' })
}
