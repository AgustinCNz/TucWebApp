import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'

import Login from './pages/Login'
import Register from './pages/Register'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/dashboard/index'
import Landing from './pages/dashboard/landing'

function App() {
  const { user } = useAuthStore()

  return (
    <Routes>
      {!user && (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}

      {user && (
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="landing" element={<Landing />} />
        </Route>
      )}
    </Routes>
  )
}

export default App
// Este componente App define las rutas principales de la aplicación.
// Si el usuario no está autenticado, muestra las rutas de login y registro.
// Si el usuario está autenticado, muestra el layout del dashboard con sus rutas internas.
// Utiliza React Router para manejar la navegación entre las diferentes páginas de la aplicación.
// También utiliza Zustand para acceder al estado de autenticación del usuario.
// Las rutas protegidas redirigen al usuario a la página de login si no está autenticado.
// El layout del dashboard incluye un header con enlaces de navegación y un botón de cierre de sesión.
// Las rutas internas del dashboard permiten al usuario acceder a su panel y a su landing page personalizada. 