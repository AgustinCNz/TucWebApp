// backend/src/modules/services/service.controller.js
import {
  createService,
  getServicesByOwner,
  updateService,
  deleteService
} from './service.model.js'

export const listServices = async (req, res) => {
  const { uid } = req.query         // owner UID
  const rows = await getServicesByOwner(uid)
  res.json(rows)
}

export const addService = async (req, res) => {
  const id = await createService(req.body)
  res.status(201).json({ id })
}

export const editService = async (req, res) => {
  const { id } = req.params
  const ok = await updateService(id, req.body)
  if (!ok) return res.status(404).json({ msg: 'No encontrado' })
  res.json({ msg: 'Actualizado' })
}

export const removeService = async (req, res) => {
  const { id } = req.params
  const ok = await deleteService(id)
  if (!ok) return res.status(404).json({ msg: 'No encontrado' })
  res.json({ msg: 'Eliminado' })
}
