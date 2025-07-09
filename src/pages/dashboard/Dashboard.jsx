
import { useAuthStore } from '../../store/useAuthStore'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useAuthStore()

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-4">Hola {user?.email || 'usuario'} 👋</h2>
      <p className="text-gray-600 mb-6">Bienvenido a tu panel. Desde aquí podés administrar tus landings.</p>

      <div className="space-y-4">
        <Link
          to="/dashboard/landing"
          className="block bg-blue-600 text-white px-4 py-3 rounded text-center hover:bg-blue-700"
        >
          Ver mis landings
        </Link>

        <Link
          to="/crear-landing"
          className="block bg-green-600 text-white px-4 py-3 rounded text-center hover:bg-green-700"
        >
          Crear nueva landing
        </Link>
      </div>
    </div>
  )
}
