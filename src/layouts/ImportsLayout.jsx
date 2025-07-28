// src/layouts/ImportsLayout.jsx
import { NavLink, Outlet } from 'react-router-dom'

export default function ImportsLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header con tabs */}
      <header className="bg-blue-700 text-white p-4 flex space-x-6">
        <NavLink
          to="/dashboard/imports"
          end
          className={({ isActive }) =>
            isActive ? 'underline font-semibold' : 'opacity-75 hover:opacity-100'
          }
        >
          Listado
        </NavLink>
        <NavLink
          to="/dashboard/imports/new"
          className={({ isActive }) =>
            isActive ? 'underline font-semibold' : 'opacity-75 hover:opacity-100'
          }
        >
          Nueva Importación
        </NavLink>
      </header>

      {/* Contenido de cada pestaña */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  )
}
