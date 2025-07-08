import { useAuthStore } from '../../store/useAuthStore'
import { actualizarUsuario } from '../../services/api'
import { useState } from 'react'

export default function Upgrade() {
  const { user, setUser } = useAuthStore()
  const [mensaje, setMensaje] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    try {
      setLoading(true)
      setMensaje("")

      const actualizado = await actualizarUsuario(user.uid, { plan: 'premium' })
        if (!actualizado) {
            setMensaje("No se pudo actualizar el plan. Intenta nuevamente.")
            return
        }
      setUser({ ...user, plan: 'premium' })
      setMensaje("¡Plan actualizado exitosamente! 🎉")
    } catch (error) {
      setMensaje("Hubo un error al actualizar el plan.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Mejorá tu plan</h2>
      <p className="mb-6">Tu cuenta actual es del plan <strong>{user?.plan}</strong>.</p>

      {user?.plan === 'free' && (
        <>
          <p className="mb-4">
            Al actualizar al plan <strong>Premium</strong> desbloqueás funcionalidades exclusivas:
          </p>

          <ul className="list-disc text-left mb-6 ml-6">
            <li>Estadísticas avanzadas</li>
            <li>Más capacidad de almacenamiento</li>
            <li>Acceso prioritario a soporte</li>
            <li>Y mucho más...</li>
          </ul>

          <button
            onClick={handleUpgrade}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Actualizando..." : "Activar Premium"}
          </button>
        </>
      )}

      {user?.plan === 'premium' && (
        <p className="text-green-600 font-bold">Ya sos usuario Premium ✅</p>
      )}

      {mensaje && <p className="mt-4 font-semibold">{mensaje}</p>}
    </div>
  )
}
