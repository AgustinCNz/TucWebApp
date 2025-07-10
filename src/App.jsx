import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'

import Upgrade from './pages/dashboard/Upgrade'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/dashboard/index'
import Landing from './pages/dashboard/Landing'
import CrearLanding from './pages/dashboard/CrearLanding'

function App() {
  const { user } = useAuthStore()

  return (
    <Routes>
      {/* Ruta pública inicial */}
      <Route path="/" element={<Home />} />

      {/* Rutas públicas siempre accesibles */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas privadas (requieren sesión) */}
      {user && (
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="landing" element={<Landing />} />
          <Route path="crear-landing" element={<CrearLanding />} />
        </Route>
      )}
      {/* 🔄 Nueva ruta para mostrar info del plan y upgrades */}
      <Route path="upgrade" element={<Upgrade />} />
      {/* Redirección según sesión */}
      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/'} />} />
    </Routes>
  )
}

export default App
