import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'

export default function Header() {
  const { user } = useAuthStore()

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow fixed top-0 w-full z-50">
      <Link to="/" className="text-xl font-bold text-gray-800">TucWeb</Link>

      {!user && (
        <div className="space-x-4">
          <Link to="/login" className="text-sm text-gray-700 hover:underline">Iniciar sesión</Link>
          <Link to="/register" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900 text-sm">Crear cuenta</Link>
        </div>
      )}
    </header>
  )
}
