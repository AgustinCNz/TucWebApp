// backend/src/modules/clients/client.routes.js
import { Router } from 'express'
import {
  listClients,
  addClient,
  editClient,
  removeClient
} from './client.controller.js'

const router = Router()

router.get('/', listClients)          // ?uid=OWNER_UID
router.post('/', addClient)           // body: { uid_owner, nombre, ... }
router.put('/:id', editClient)
router.delete('/:id', removeClient)

export default router
