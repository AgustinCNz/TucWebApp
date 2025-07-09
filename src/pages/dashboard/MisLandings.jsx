import { useEffect, useState } from 'react'
import { obtenerLandingsPorUsuario, eliminarLanding } from '../../services/api'
import { useAuthStore } from '../../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

export default function MisLandings() {
  const { user } = useAuthStore()
  const [landings, setLandings] = useState([])
  const [mensaje, setMensaje] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const cargarLandings = async () => {
      try {
        const data = await obtenerLandingsPorUsuario(user.uid)
        setLandings(data)
      } catch (error) {
        console.error('Error al obtener landings:', error)
        setMensaje("No se pudieron cargar las landings")
      }
    }

    cargarLandings()
  }, [user.uid])

  const handleEliminar = async (id) => {
    const confirm = window.confirm("¿Estás seguro que deseas eliminar esta landing?")
    if (!confirm) return

    try {
      await eliminarLanding(id)
      setLandings(landings.filter(l => l.id !== id))
      setMensaje("Landing eliminada con éxito ✅")
    } catch (error) {
      console.error('Error al eliminar landing:', error)
      setMensaje("Error al eliminar landing ❌")
    }
  }

  const handleEditar = (landingId) => {
    navigate(`/dashboard/landing/editar/${landingId}`)
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Mis Landings</h2>

      {mensaje && <p className="mb-4 text-blue-600">{mensaje}</p>}

      {landings.length === 0 ? (
        <p>No tenés landings creadas aún.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {landings.map((landing) => (
            <div key={landing.id} className="bg-white rounded shadow p-4">
              <h3 className="text-xl font-semibold">{landing.titulo}</h3>
              <p className="text-gray-600">{landing.subtitulo}</p>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleEditar(landing.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(landing.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
