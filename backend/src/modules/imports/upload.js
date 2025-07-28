// upload.js — configura multer para leer archivos en memoria
import multer from 'multer'

// Storage en memoria permite acceder al buffer de cada archivo
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 6 * 1024 * 1024 } // max 6 MB por archivo
})
