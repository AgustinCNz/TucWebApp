import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

import DashboardLayout from '@/layouts/DashboardLayout'
import Dashboard from '@/pages/dashboard/Dashboard'
import ClientesPage from '@/pages/dashboard/clientes'

function App () {
  const { user } = useAuthStore()

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas privadas */}
      {user && (
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clientes" element={<ClientesPage />} />
          {/* Agregarás más rutas aquí cuando los demás módulos estén listos */}
        </Route>
      )}

      {/* Catch-all */}
      <Route
        path="*"
        element={<Navigate to={user ? '/dashboard' : '/'} />}
      />
    </Routes>
  )
}

export default App
