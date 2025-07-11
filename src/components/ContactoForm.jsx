// src/components/ContactoForm.jsx
// -----------------------------------------------------------------------------
// Formulario de contacto: envía datos al backend y muestra feedback al usuario.
// -----------------------------------------------------------------------------

import { useState } from 'react'
import { enviarContacto } from '../services/api.js' // Servicio HTTP (POST /api/contacto)

export default function ContactoForm () {
  // Estado local controlado para cada campo
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    mensaje: ''
  })

  // Handler genérico → actualiza por name
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  // Envío del formulario
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await enviarContacto(form)                 // Petición al backend
      alert('Mensaje enviado correctamente.')
      // Reseteamos campos
      setForm({ nombre: '', email: '', whatsapp: '', mensaje: '' })
    } catch (error) {
      console.error('Error al enviar el mensaje:', error)
      alert('Hubo un error al enviar el mensaje.')
    }
  }

  return (
    <section className='bg-gray-900 text-white py-16 px-5' id='contacto'>
      <div className='max-w-3xl mx-auto'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-10'>
          ¿Querés tu landing?
        </h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Nombre */}
          <div>
            <label className='block mb-1'>Nombre</label>
            <input
              type='text'
              name='nombre'
              value={form.nombre}
              onChange={handleChange}
              className='w-full px-4 py-2 rounded-md text-black'
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className='block mb-1'>Email</label>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              className='w-full px-4 py-2 rounded-md text-black'
              required
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className='block mb-1'>WhatsApp</label>
            <input
              type='text'
              name='whatsapp'
              value={form.whatsapp}
              onChange={handleChange}
              className='w-full px-4 py-2 rounded-md text-black'
              required
            />
          </div>

          {/* Mensaje */}
          <div>
            <label className='block mb-1'>Mensaje</label>
            <textarea
              name='mensaje'
              value={form.mensaje}
              onChange={handleChange}
              className='w-full px-4 py-2 rounded-md text-black'
              rows='4'
              required
            ></textarea>
          </div>

          {/* Botón enviar */}
          <div className='text-center'>
            <button
              type='submit'
              className='bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition'
            >
              Enviar mensaje
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

/* ──────────────────────── Sugerencias ────────────────────────
1. Validá formato de WhatsApp (regex) y limita caracteres de mensaje.
2. Reemplazá alert() por toast (ej. react-hot-toast) para UX moderna.
3. Deshabilitá el botón mientras se envía → estado loading.
-----------------------------------------------------------------*/
