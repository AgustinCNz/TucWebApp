import { useAuthStore } from '@/store/useAuthStore'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Link, Outlet, useNavigate, NavLink } from 'react-router-dom'

export default function DashboardLayout () {
  const { user, clearUser } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    clearUser()
    navigate('/')
  }

  /* util para resaltar pestaña activa */
  const linkClass = ({ isActive }) =>
    `px-3 py-1 rounded hover:bg-gray-800 ${
      isActive ? 'bg-gray-800 text-white' : 'text-gray-300'
    }`

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-black text-white px-6 py-3 flex justify-between items-center'>
        <h1 className='text-lg font-bold'>TucWeb Panel</h1>

        {/* nav */}
        <nav className='flex gap-2'>
          <NavLink to='/dashboard'        className={linkClass} end>Resumen</NavLink>
          <NavLink to='clientes'          className={linkClass}>Clientes</NavLink>
          <NavLink to='servicios'         className={linkClass}>Servicios</NavLink>
          <NavLink to='finanzas'          className={linkClass}>Finanzas</NavLink>
          <NavLink to='importaciones'     className={linkClass}>Importaciones</NavLink>
          <NavLink to='inmuebles'         className={linkClass}>Inmuebles</NavLink>
        </nav>

        <div className='flex items-center gap-4'>
          <span className='text-sm hidden sm:block'>{user?.email}</span>
          <button
            onClick={handleLogout}
            className='bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm'
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className='flex-grow bg-gray-100 p-6'>
        <Outlet />
      </main>
    </div>
  )
}
