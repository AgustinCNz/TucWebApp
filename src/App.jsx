// src/App.jsx
// -----------------------------------------------------------------------------
// Define las rutas principales de la SPA utilizando React Router.
// -----------------------------------------------------------------------------

import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'         // Zustand para auth state

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

// Layout y páginas privadas
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/dashboard/index'
import Landing from './pages/dashboard/Landing'
import CrearLanding from './pages/dashboard/CrearLanding'

function App () {
  const { user } = useAuthStore()                           // user === null → no logueado

  return (
    <Routes>
      {/* ─────────────────── Rutas públicas ─────────────────── */}
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* ─────────────────── Rutas privadas ─────────────────── */}
      {user && (
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />            {/* /dashboard */}
          <Route path='landing' element={<Landing />} />     {/* /dashboard/landing */}
          <Route path='crear-landing' element={<CrearLanding />} />
        </Route>
      )}


      {/* ─────────────────── Redirección catch-all ─────────────────── */}
      <Route
        path='*'
        element={<Navigate to={user ? '/dashboard' : '/'} />}
      />
    </Routes>
  )
}

export default App

// Sugerencias

// Extraer un componente <PrivateRoute> para desacoplar lógica de auth.

// Agregá código de lazy loading con React.lazy y Suspense para optimizar.