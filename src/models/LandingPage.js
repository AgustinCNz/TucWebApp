export class LandingPage {
  #tipo = 'base'

  constructor({ id, nombre, colorFondo = '#ffffff', textos = [], usuarioUid }) {
    this.id = id
    this.nombre = nombre
    this.colorFondo = colorFondo
    this.textos = textos
    this.usuarioUid = usuarioUid
  }

  getTipo() {
    return this.#tipo
  }

  agregarTexto(nuevoTexto) {
    this.textos.push(nuevoTexto)
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      colorFondo: this.colorFondo,
      textos: this.textos,
      usuarioUid: this.usuarioUid,
      tipo: this.getTipo()
    }
  }
}
