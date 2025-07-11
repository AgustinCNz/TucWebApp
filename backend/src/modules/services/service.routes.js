// backend/src/modules/services/service.routes.js
import { Router } from 'express'
import {
  listServices,
  addService,
  editService,
  removeService
} from './service.controller.js'

const router = Router()

router.get('/', listServices)      // ?uid=ownerUid
router.post('/', addService)
router.put('/:id', editService)
router.delete('/:id', removeService)

export default router
