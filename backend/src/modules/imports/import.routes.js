import { Router } from 'express'
import {
  listImports,
  addImport,
  editImport,
  removeImport
} from './import.controller.js'

const router = Router()

router.get('/', listImports)          // ?uid=OWNER_UID
router.post('/', addImport)
router.put('/:id', editImport)
router.delete('/:id', removeImport)

export default router
