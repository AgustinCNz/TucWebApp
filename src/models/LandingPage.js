// src/models/LandingPage.js
// -----------------------------------------------------------------------------
// Clase base (Abstract) para representar una Landing genérica.
// -----------------------------------------------------------------------------

export class LandingPage {
  #tipo = 'base' // Campo privado: identifica subtipo

  constructor ({ id, nombre, colorFondo = '#ffffff', textos = [], usuarioUid }) {
    this.id = id
    this.nombre = nombre
    this.colorFondo = colorFondo
    this.textos = textos
    this.usuarioUid = usuarioUid
  }

  // Getter de tipo (subclases pueden sobreescribir #tipo)
  getTipo () {
    return this.#tipo
  }

  // Agrega un texto al array
  agregarTexto (nuevoTexto) {
    this.textos.push(nuevoTexto)
  }

  // Convierte a JSON serializable para API / Storage
  toJSON () {
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

// Sugerencias para ambos modelos

// Considerá validar longitud/formato en setters (ej. colorFondo HEX).