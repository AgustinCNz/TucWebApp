import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { obtenerLandingPorId, actualizarLanding } from '../../services/api'

export default function EditarLanding() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    descripcion: '',
    color: '',
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLanding = async () => {
      try {
        const data = await obtenerLandingPorId(id)
        setFormData(data)
      } catch (err) {
        setError('Error al cargar la landing')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLanding()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await actualizarLanding(id, formData)
      navigate('/dashboard/landing') // redirigir al listado
    } catch (err) {
      setError('Error al actualizar la landing')
      console.error(err)
    }
  }

  if (loading) return <p className="text-center mt-6">Cargando datos...</p>
  if (error) return <p className="text-center text-red-600">{error}</p>

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Editar Landing</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Título</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Subtítulo</label>
          <input
            type="text"
            name="subtitulo"
            value={formData.subtitulo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Color principal</label>
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-12 h-10 p-0 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  )
}
