// ✅ src/pages/dashboard/PreviewLanding.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { obtenerLandingPorId } from '../../services/api'

export default function PreviewLanding() {
  const { id } = useParams()
  const [landing, setLanding] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const fetchLanding = async () => {
      try {
        const data = await obtenerLandingPorId(id)
        setLanding(data)
      } catch (error) {
        console.error('Error al cargar la landing:', error)
      } finally {
        setCargando(false)
      }
    }

    fetchLanding()
  }, [id])

  if (cargando) return <p className="text-center mt-10">Cargando...</p>
  if (!landing) return <p className="text-center mt-10 text-red-600">Landing no encontrada.</p>

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundColor: landing.color_fondo || '#fff' }}
    >
      <div className="max-w-2xl bg-white shadow-lg rounded p-8 w-full text-center">
        <h1 className="text-3xl font-bold mb-4">{landing.titulo}</h1>
        <h2 className="text-xl text-gray-700 mb-6">{landing.subtitulo}</h2>
        <p className="mb-6">{landing.descripcion}</p>

        <a
          href={`https://wa.me/${landing.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 inline-block"
        >
          Contactar por WhatsApp
        </a>

        {landing.marca_agua && (
          <p className="mt-8 text-sm text-gray-400">
            Creado con <strong>TucWeb</strong>
          </p>
        )}
      </div>
    </div>
  )
}
