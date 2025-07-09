import { LandingPage } from './LandingPage.js'

export class LandingNegocio extends LandingPage {
  #tipo = 'negocio'

  constructor(data) {
    super(data)
    this.servicios = data.servicios || []
    this.whatsapp = data.whatsapp || ''
    this.ubicacion = data.ubicacion || ''
  }

  agregarServicio(servicio) {
    this.servicios.push(servicio)
  }

  toJSON() {
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
