// Formulario de contacto que después conectaremos al backend
import { useState } from "react"

export default function ContactoForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    whatsapp: "",
    mensaje: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Formulario enviado:", form)
    alert("Gracias por tu mensaje. Te responderemos pronto.")
    setForm({ nombre: "", email: "", whatsapp: "", mensaje: "" })
    // Aquí después conectamos al backend
  }

  return (
    <section className="bg-gray-900 text-white py-16 px-5" id="contacto">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">¿Querés tu landing?</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md text-black"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md text-black"
              required
            />
          </div>
          <div>
            <label className="block mb-1">WhatsApp</label>
            <input
              type="text"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md text-black"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Mensaje</label>
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md text-black"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              Enviar mensaje
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
