// backend/src/modules/clients/client.service.js
import {
  createClient,
  getClientsByOwner,
  getClientById,
  updateClient,
  deleteClient
} from './client.model.js'

// Podrías validar con Zod/Joi aquí; por ahora es directo.
export default {
  createClient,
  getClientsByOwner,
  getClientById,
  updateClient,
  deleteClient
}
