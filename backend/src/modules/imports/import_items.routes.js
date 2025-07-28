// backend/src/modules/imports/import_items.routes.js
import { Router } from 'express'
import {
  addItem,
  uploadImages,
  getItem
} from './import_items.controller.js'
import { upload } from './upload.js'

const router = Router()

// Crea un nuevo ítem (JSON en body)
router.post('/', addItem)

// Sube hasta 10 imágenes (form-data “images”)
router.post(
  '/:itemId/images',
  upload.array('images', 10),
  uploadImages
)

// Obtiene un ítem + sus imágenes
router.get('/:itemId', getItem)

export default router
