import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { crearLanding } from '../../services/api'

export default function CrearLanding() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    titulo: '',
    subtitulo: '',
    descripcion: '',
    whatsapp: '',
    color_fondo: '#ffffff',
    marca_agua: true,
  })

  const [mensaje, setMensaje] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMensaje('')

    try {
      await crearLanding(user.uid, form)
      setMensaje('Landing creada con éxito ✅')
      setTimeout(() => navigate('/dashboard/landing'), 1500)
    } catch (error) {
      console.error(error)
      setMensaje('Error al crear la landing')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Crear nueva Landing</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="subtitulo"
          placeholder="Subtítulo"
          value={form.subtitulo}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          rows={4}
        />
        <input
          type="text"
          name="whatsapp"
          placeholder="Número de WhatsApp"
          value={form.whatsapp}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <label className="block">
          Color de fondo:
          <input
            type="color"
            name="color_fondo"
            value={form.color_fondo}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="marca_agua"
            checked={form.marca_agua}
            onChange={handleChange}
          />
          <span>Mostrar marca de agua</span>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 w-full"
        >
          {loading ? 'Creando...' : 'Crear Landing'}
        </button>
      </form>

      {mensaje && <p className="mt-4 text-center font-semibold">{mensaje}</p>}
    </div>
  )
}
