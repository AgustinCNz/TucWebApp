// src/models/LandingNegocio.js
// -----------------------------------------------------------------------------
// Extiende LandingPage añadiendo campos específicos de un negocio (servicios,
// WhatsApp, ubicación).
// -----------------------------------------------------------------------------

import { LandingPage } from './LandingPage.js'

export class LandingNegocio extends LandingPage {
  #tipo = 'negocio' // Sobrescribe tipo privado

  constructor (data) {
    super(data)
    this.servicios = data.servicios || []
    this.whatsapp = data.whatsapp || ''
    this.ubicacion = data.ubicacion || ''
  }

  // Añade un servicio a la lista
  agregarServicio (servicio) {
    this.servicios.push(servicio)
  }

  // Serializa incluyendo campos extra
  toJSON () {
    const base = super.toJSON()
    return {
      ...base,
      servicios: this.servicios,
      whatsapp: this.whatsapp,
      ubicacion: this.ubicacion,
      tipo: this.#tipo
    }
  }
}

// Sugerencias para ambos modelos

// Considerá validar longitud/formato en setters (ej. colorFondo HEX).