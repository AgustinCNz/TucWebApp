// src/pages/dashboard/EditarLanding.jsx
// -----------------------------------------------------------------------------
// Formulario para editar una landing existente. Carga inicial por ID y permite
// actualizar datos. Tras guardar, redirige al listado.
// -----------------------------------------------------------------------------

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { obtenerLandingPorId, actualizarLanding } from '../../services/api'

export default function EditarLanding () {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    descripcion: '',
    color: ''
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Carga inicial
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

  /* Handlers */
  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await actualizarLanding(id, formData)
      navigate('/dashboard/landing')
    } catch (err) {
      setError('Error al actualizar la landing')
      console.error(err)
    }
  }

  /* UI states */
  if (loading) return <p className='text-center mt-6'>Cargando datos...</p>
  if (error) return <p className='text-center text-red-600'>{error}</p>

  return (
    <div className='max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow'>
      <h2 className='text-2xl font-bold mb-4'>Editar Landing</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        {[
          { label: 'Título', name: 'titulo', type: 'text' },
          { label: 'Subtítulo', name: 'subtitulo', type: 'text' }
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className='block text-sm font-medium'>{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className='w-full border px-3 py-2 rounded'
              required={name === 'titulo'}
            />
          </div>
        ))}

        <div>
          <label className='block text-sm font-medium'>Descripción</label>
          <textarea
            name='descripcion'
            value={formData.descripcion}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded'
            rows='4'
          />
        </div>

        <div>
          <label className='block text-sm font-medium'>Color principal</label>
          <input
            type='color'
            name='color'
            value={formData.color}
            onChange={handleChange}
            className='w-12 h-10 p-0 border rounded'
          />
        </div>

        <button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
          Guardar cambios
        </button>
      </form>
    </div>
  )
}

// Sugerencias comunes para dashboard

// Implementar guardia de ruta (if (!user) navigate('/login')) para protección adicional.

// Usar react-hook-form + zod para validaciones robustas y menos código repetido.