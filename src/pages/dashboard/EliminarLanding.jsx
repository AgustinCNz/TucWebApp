// src/pages/dashboard/EliminarLanding.jsx
// -----------------------------------------------------------------------------
// Permite listar y eliminar landings del usuario. Carga listado desde API y
// filtra el estado local tras borrar.
// -----------------------------------------------------------------------------

import { useEffect, useState } from 'react'
import { obtenerLandings, eliminarLanding } from '../../services/api'
import { useAuthStore } from '../../store/useAuthStore'

export default function EliminarLanding () {
  const { user } = useAuthStore()               // uid del usuario logueado
  const [landings, setLandings] = useState([])  // listado de landings
  const [loading, setLoading] = useState(true)  // flag de carga

  /* ───────────────────────── Eliminar ───────────────────────── */
  const handleEliminar = async id => {
    if (!confirm('¿Estás seguro de eliminar esta landing?')) return
    try {
      await eliminarLanding(id)                // DELETE backend
      setLandings(landings.filter(l => l.id !== id)) // Actualiza UI
    } catch (error) {
      console.error('Error al eliminar landing:', error)
    }
  }

  /* ───────────────────────── Carga inicial ───────────────────────── */
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await obtenerLandings(user.uid)
        setLandings(data)
      } catch (error) {
        console.error('Error al cargar landings:', error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [user.uid])

  /* ───────────────────────── Render ───────────────────────── */
  return (
    <div className='max-w-3xl mx-auto mt-10'>
      <h2 className='text-2xl font-bold mb-4'>Eliminar Landings</h2>

      {loading ? (
        <p>Cargando landings...</p>
      ) : landings.length === 0 ? (
        <p>No hay landings disponibles.</p>
      ) : (
        <ul className='space-y-4'>
          {landings.map(landing => (
            <li
              key={landing.id}
              className='bg-white p-4 rounded shadow flex justify-between items-center'
            >
              <div>
                <p className='font-semibold'>{landing.titulo}</p>
                <p className='text-sm text-gray-500'>{landing.subtitulo}</p>
              </div>

              <button
                onClick={() => handleEliminar(landing.id)}
                className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/* Sugerencias
1. Mostrar toast de éxito/error en vez de confirm/alert nativos.
2. Añadir paginación si la lista crece.
*/
// Nota: Este componente asume que las funciones obtenerLandings y eliminarLanding