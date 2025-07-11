import { Router } from 'express'
import {
  listFinances,
  addFinance,
  editFinance,
  removeFinance
} from './finance.controller.js'

const router = Router()

router.get('/',  listFinances)        // ?uid=&month=&year=&categoria=
router.post('/', addFinance)
router.put('/:id', editFinance)
router.delete('/:id', removeFinance)

export default router
