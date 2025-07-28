// backend/src/modules/imports/import_items.controller.js
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { firebaseApp } from '../../config/firebase.js'
import {
  createItem,
  addItemImage,
  getItemWithImages
} from './import_items.model.js'

// Instancia de Storage para subir archivos
const storage = getStorage(firebaseApp)

/**
 * POST /api/import_items
 * Crea un nuevo ítem (sin imágenes).
 */
export const addItem = async (req, res) => {
  try {
    const id = await createItem(req.body)
    res.status(201).json({ id })
  } catch (error) {
    console.error('Error en createItem:', error)
    res.status(500).json({ error: 'No se pudo crear el ítem' })
  }
}

/**
 * POST /api/import_items/:itemId/images
 * Sube hasta 10 imágenes a Firebase y guarda sus URLs en BD.
 */
export const uploadImages = async (req, res) => {
  const { itemId } = req.params
  const urls = []

  try {
    // Recorre cada archivo enviado por multer
    for (const file of req.files) {
      // Crea una referencia única en Storage
      const storageRef = ref(
        storage,
        `imports/${itemId}/${Date.now()}_${file.originalname}`
      )
      // Sube el buffer al Storage
      await uploadBytes(storageRef, file.buffer, {
        contentType: file.mimetype
      })
      // Obtiene URL pública
      const url = await getDownloadURL(storageRef)
      // Lo guarda en la tabla import_item_images
      await addItemImage(itemId, url)
      urls.push(url)
    }

    res.status(201).json({ urls })
  } catch (error) {
    console.error('Error al subir imágenes:', error)
    res.status(500).json({ error: 'No se pudieron subir las imágenes' })
  }
}

/**
 * GET /api/import_items/:itemId
 * Devuelve un ítem junto con sus imágenes.
 */
export const getItem = async (req, res) => {
  try {
    const data = await getItemWithImages(req.params.itemId)
    res.json(data)
  } catch (error) {
    console.error('Error en getItemWithImages:', error)
    res.status(500).json({ error: 'No se pudo obtener el ítem' })
  }
}
