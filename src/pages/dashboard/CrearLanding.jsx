import { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { crearLanding } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function CrearLanding() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    titulo: '',
    subtitulo: '',
    descripcion: '',
    whatsapp: '',
    email: '',
    instagram: '',
    facebook: '',
    imagen_destacada: '',
    color_fondo: '#ffffff',
  })

  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')
    setError('')

    try {
      await crearLanding({ uid: user.uid, ...form })
      setMensaje('✅ Landing creada correctamente')
      navigate('/dashboard/landing')
    } catch (err) {
      console.error(err)
      setError('❌ Hubo un error al crear la landing')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-4">Crear nueva landing</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" required className="w-full p-2 border rounded" />
        <input name="subtitulo" value={form.subtitulo} onChange={handleChange} placeholder="Subtítulo" required className="w-full p-2 border rounded" />
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" required className="w-full p-2 border rounded" />

        <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="Número de WhatsApp" className="w-full p-2 border rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email de contacto" className="w-full p-2 border rounded" />
        <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="Instagram (URL)" className="w-full p-2 border rounded" />
        <input name="facebook" value={form.facebook} onChange={handleChange} placeholder="Facebook (URL)" className="w-full p-2 border rounded" />
        <input name="imagen_destacada" value={form.imagen_destacada} onChange={handleChange} placeholder="URL de imagen destacada" className="w-full p-2 border rounded" />
        
        <label className="block mt-4 font-semibold">Color de fondo:</label>
        <input type="color" name="color_fondo" value={form.color_fondo} onChange={handleChange} className="w-16 h-10 rounded" />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Crear Landing
        </button>
      </form>

      {mensaje && <p className="text-green-600 mt-4">{mensaje}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  )
}
