import {
  createImport,
  getImportsByOwner,
  updateImport,
  deleteImport
} from './import.model.js'

export const listImports = async (req, res) => {
  const rows = await getImportsByOwner(req.query.uid)
  res.json(rows)
}

export const addImport = async (req, res) => {
  const id = await createImport(req.body)
  res.status(201).json({ id })
}

export const editImport = async (req, res) => {
  const ok = await updateImport(req.params.id, req.body)
  if (!ok) return res.status(404).json({ msg: 'No encontrado' })
  res.json({ msg: 'Actualizado' })
}

export const removeImport = async (req, res) => {
  const ok = await deleteImport(req.params.id)
  if (!ok) return res.status(404).json({ msg: 'No encontrado' })
  res.json({ msg: 'Eliminado' })
}
