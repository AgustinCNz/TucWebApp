// src/pages/dashboard/landing.jsx
// -----------------------------------------------------------------------------
// Lista de landings del usuario con link a vista previa.
// -----------------------------------------------------------------------------

import { useEffect, useState } from 'react'
import { obtenerLandings } from '../../services/api'
import { useAuthStore } from '../../store/useAuthStore'
import { Link } from 'react-router-dom'

export default function Landing () {
  const { user } = useAuthStore()
  const [landings, setLandings] = useState([])
  const [loading, setLoading] = useState(true)

  /* ───────────────────────── Fetch ───────────────────────── */
  useEffect(() => {
    const fetchLandings = async () => {
      try {
        const data = await obtenerLandings(user.uid)
        setLandings(data)
      } catch (error) {
        console.error('Error al cargar landings:', error)
      } finally {
        setLoading(false)
      }
    }
    if (user?.uid) fetchLandings()
  }, [user?.uid])

  /* ───────────────────────── Render ───────────────────────── */
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Mis Landings</h2>

      <Link
          to='../crear-landing'
          className='inline-block mb-4 bg-black text-white px-4 py-2 rounded'
        >
          + Crear nueva landing
        </Link>
      

      {loading ? (
        <p>Cargando...</p>
      ) : landings.length === 0 ? (
        <p>No tenés landings aún.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {landings.map(landing => (
            <div key={landing.id} className='bg-white shadow p-4 rounded'>
              <h3 className='text-lg font-semibold mb-2'>{landing.titulo}</h3>
              <p className='text-sm text-gray-600 mb-1'>{landing.subtitulo}</p>
              <p className='text-xs text-gray-500'>
                Creada el{' '}
                {new Date(landing.fecha_creacion).toLocaleDateString()}
              </p>

              <Link
                to={`/dashboard/landing/preview/${landing.id}`}
                className='mt-2 inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm'
              >
                Vista previa
              </Link>
              <Link
                  to={`/dashboard/landing/editar-visual/${landing.id}`}
                  className="mt-2 inline-block bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm"
                >
                  Editor visual
                </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* Sugerencias
1. Agregar botón Editar/Eliminar aquí para acceso rápido.
2. Implementar skeleton loader en vez de “Cargando…”.
*/
