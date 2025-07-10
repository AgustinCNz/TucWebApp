// src/components/Navbar.jsx
// -----------------------------------------------------------------------------
// Barra de navegación fija con logo y enlaces de auth.
// -----------------------------------------------------------------------------

import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'

export default function Navbar () {
  const { user } = useAuthStore() // Si hay usuario → mostrar menú distinto

  return (
    <header className='flex justify-between items-center px-6 py-4 bg-white shadow fixed top-0 w-full z-50'>
      {/* Logo / Home */}
      <Link to='/' className='text-xl font-bold text-gray-800'>
        TucWeb
      </Link>

      {/* Botones de auth cuando no hay sesión */}
      {!user && (
        <div className='space-x-4'>
          <Link to='/login' className='text-sm text-gray-700 hover:underline'>
            Iniciar sesión
          </Link>
          <Link
            to='/register'
            className='bg-black text-white px-4 py-2 rounded hover:bg-gray-900 text-sm'
          >
            Crear cuenta
          </Link>
        </div>
      )}
    </header>
  )
}

/* ──────────────────────── Sugerencias ────────────────────────
1. Mostrá avatar + menú desplegable si user está logueado.
2. Usa clsx o Tailwind Merge para manejar clases condicionales.
-----------------------------------------------------------------*/
