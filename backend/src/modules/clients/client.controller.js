// backend/src/modules/clients/client.controller.js
import clientService from './client.service.js'

/* GET /api/clients?uid=<uid_owner> */
export async function listClients (req, res) {
  const { uid } = req.query
  const data = await clientService.getClientsByOwner(uid)
  res.json(data)
}

/* POST /api/clients */
export async function addClient (req, res) {
  const id = await clientService.createClient(req.body)
  res.status(201).json({ id })
}

/* PUT /api/clients/:id */
export async function editClient (req, res) {
  const { id } = req.params
  const ok = await clientService.updateClient(id, req.body)
  if (!ok) return res.status(404).json({ msg: 'No encontrado' })
  res.json({ msg: 'Actualizado' })
}

/* DELETE /api/clients/:id */
export async function removeClient (req, res) {
  const { id } = req.params
  const ok = await clientService.deleteClient(id)
  if (!ok) return res.status(404).json({ msg: 'No encontrado' })
  res.json({ msg: 'Eliminado' })
}
