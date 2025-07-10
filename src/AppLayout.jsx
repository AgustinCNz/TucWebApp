// src/AppLayout.jsx
// -----------------------------------------------------------------------------
// Alternativa a App.jsx: gestiona auth con Firebase directamente.
// Se dejó para referencia pero NO se usa si ya tenés App.jsx + rutas.
// -----------------------------------------------------------------------------

import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'            // Config de Firebase
import { useAuthStore } from './store/useAuthStore'

import Login from './pages/Login'
import Home from './pages/Home'
import MisLandings from './components/MisLandings'

function AppLayout () {
  const { user, setUser, clearUser } = useAuthStore()

  // Suscripción a cambios de sesión Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      firebaseUser ? setUser(firebaseUser) : clearUser()
    })
    return () => unsubscribe()                  // Limpiamos listener al desmontar
  }, [setUser, clearUser])

  // ─────────────────── Render condicional ───────────────────
  if (!user) return <Login />                   // Sin sesión → Login

  return (
    <>
      <Home />                                 {/* Sección pública */}
      <MisLandings />                          {/* Listado interno */}
      {/* Agregá más componentes o rutas aquí si lo necesitás */}
    </>
  )
}

export default AppLayout
// Nota: Asegurate de no tener dos componentes <App> exportados en el proyecto.

// Sugerencias

// Renombrá este archivo o eliminá su export duplicado para evitar colisión con App.jsx.

// Podrías integrar esta lógica en un contexto de autenticación global.