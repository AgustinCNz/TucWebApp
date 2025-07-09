import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { obtenerLandingPorId, actualizarLanding } from '../../services/api'

export default function EditarLanding() {
  const { landingId } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    titulo: '',
    subtitulo: '',
    descripcion: '',
    whatsapp: '',
    color_fondo: '#ffffff',
    marca_agua: true,
  })

  const [mensaje, setMensaje] = useState("")

  useEffect(() => {
    const cargarLanding = async () => {
      try {
        const data = await obtenerLandingPorId(landingId)
        if (data) {
          setForm(data)
        } else {
          setMensaje("No se encontró la landing solicitada")
        }
      } catch (error) {
        console.error('Error al cargar landing:', error)
        setMensaje("Error al cargar los datos")
      }
    }

    cargarLanding()
  }, [landingId])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje("")

    try {
      await actualizarLanding(landingId, form)
      setMensaje("Landing actualizada correctamente ✅")
      setTimeout(() => navigate('/dashboard/landing'), 1500)
    } catch (error) {
      console.error('Error al actualizar:', error)
      setMensaje("No se pudo actualizar la landing ❌")
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Editar Landing</h2>

      {mensaje && <p className="mb-4 text-blue-600 font-semibold">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="subtitulo" placeholder="Subtítulo" value={form.subtitulo} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} className="w-full p-2 border rounded" rows={4} />
        <input type="text" name="whatsapp" placeholder="Número de WhatsApp" value={form.whatsapp} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="color" name="color_fondo" value={form.color_fondo} onChange={handleChange} className="w-full p-2 border rounded" />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="marca_agua" checked={form.marca_agua} onChange={handleChange} />
          Mostrar marca de agua
        </label>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Guardar cambios
        </button>
      </form>
    </div>
  )
}