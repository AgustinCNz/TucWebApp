// src/layouts/DashboardLayout.jsx
// -----------------------------------------------------------------------------
// Layout principal del panel de usuario (zona privada).
// Contiene un header con navegación y botón de logout; el contenido cambia
// mediante <Outlet /> según la ruta hija (React Router).
// -----------------------------------------------------------------------------

import { useAuthStore } from '../store/useAuthStore'         // Estado global auth (Zustand)
import { signOut } from 'firebase/auth'                      // Cierra sesión Firebase
import { auth } from '../lib/firebase'                       // Instancia de Firebase Auth
import { Link, Outlet, useNavigate } from 'react-router-dom' // Navegación SPA

export default function DashboardLayout () {
  const { user, clearUser } = useAuthStore() // Obtenemos usuario + acciones
  const navigate = useNavigate()

  // ────────────────────────────────────────────────────────────────────────────
  // Cerrar sesión: signOut ⇒ limpia store ⇒ redirige a Home
  // ────────────────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await signOut(auth)
    clearUser()
    navigate('/')
  }

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Header fijo del dashboard */}
      <header className='bg-black text-white p-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold'>TucWeb Panel</h1>

        {/* Navegación + saludo */}
        <div className='space-x-4 flex items-center'>
          <span className='text-sm'>Hola, {user?.email}</span>
          <Link to='/dashboard' className='hover:underline'>
            Inicio
          </Link>
          <Link to='/dashboard/landing' className='hover:underline'>
            Mi Landing
          </Link>
          <button
            onClick={handleLogout}
            className='bg-red-500 px-4 py-1 rounded hover:bg-red-600'
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Área central donde se renderizan las páginas hijas */}
      <main className='flex-grow bg-gray-100 p-6'>
        <Outlet />
      </main>
    </div>
  )
}


// Sugerencias

// Extraé el header a un componente DashboardHeader para reutilizar estilos.

// Muestra estado “Cerrando sesión…” (spinner) para UX suave.

// Añadí control de errores al signOut con try/catch por si falla la red.