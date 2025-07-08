import { useAuthStore } from '../store/useAuthStore'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function DashboardLayout() {
  const { user, clearUser } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    clearUser()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">TucWeb Panel</h1>
        <div className="space-x-4 flex items-center">
            <span className="text-sm">Hola, {user?.email}</span>
            <Link to="/dashboard" className="hover:underline">Inicio</Link>
            <Link to="/dashboard/landing" className="hover:underline">Mi Landing</Link>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded hover:bg-red-600">
            Cerrar sesión
            </button>
        </div>
        </header>


      <main className="flex-grow bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  )
}
// Este componente DashboardLayout es el layout principal del panel de usuario.
// Incluye un header con enlaces de navegación y un botón de cierre de sesión.  