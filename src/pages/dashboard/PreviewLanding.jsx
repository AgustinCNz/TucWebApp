// src/pages/dashboard/PreviewLanding.jsx
// -----------------------------------------------------------------------------
// Renderiza una landing en modo vista previa dentro del dashboard.
// -----------------------------------------------------------------------------

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { obtenerLandingPorId } from '../../services/api'

export default function PreviewLanding () {
  const { id } = useParams()
  const [landing, setLanding] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /* Cargar landing por ID */
  useEffect(() => {
    const fetchLanding = async () => {
      try {
        const data = await obtenerLandingPorId(id)
        setLanding(data)
      } catch (err) {
        setError('Error al cargar la vista previa')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchLanding()
  }, [id])

  /* Estados UI */
  if (loading) return <p className='text-center mt-10'>Cargando vista previa...</p>
  if (error) return <p className='text-center text-red-600 mt-10'>{error}</p>
  if (!landing) return null

  /* Render */
  return (
    <div
      className='min-h-screen flex items-center justify-center px-4 py-10'
      style={{ backgroundColor: landing.color_fondo || '#f3f4f6' }}
    >
      <div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl text-center space-y-4'>

        {/* Imagen destacada */}
        {landing.imagen_destacada && (
          <img
            src={landing.imagen_destacada}
            alt='Imagen destacada'
            className='mx-auto mb-4 rounded-lg shadow w-full max-h-64 object-contain'
          />
        )}

        {/* Texto principal */}
        <h1 className='text-3xl font-bold'>{landing.titulo}</h1>
        <h2 className='text-lg text-gray-600'>{landing.subtitulo}</h2>
        <p className='text-gray-700'>{landing.descripcion}</p>

        {/* Botones de contacto */}
        {landing.whatsapp && (
          <a
            href={`https://wa.me/${landing.whatsapp}`}
            target='_blank'
            rel='noopener noreferrer'
            className='block mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600'
          >
            Contactar por WhatsApp
          </a>
        )}

        {landing.email && (
          <a
            href={`mailto:${landing.email}`}
            className='block mt-2 text-blue-600 underline'
          >
            Enviar Email
          </a>
        )}

        {/* Redes */}
        <div className='flex justify-center gap-4 mt-6'>
          {landing.instagram && (
            <a href={landing.instagram} target='_blank' rel='noopener noreferrer'>
              <img
                src='https://cdn-icons-png.flaticon.com/512/174/174855.png'
                alt='Instagram'
                className='w-6 h-6'
              />
            </a>
          )}
          {landing.facebook && (
            <a href={landing.facebook} target='_blank' rel='noopener noreferrer'>
              <img
                src='https://cdn-icons-png.flaticon.com/512/733/733547.png'
                alt='Facebook'
                className='w-6 h-6'
              />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/* Sugerencias
1. Reutilizar este componente también para la versión pública de la landing.
2. Optimizar imágenes con <img loading="lazy">.
*/
