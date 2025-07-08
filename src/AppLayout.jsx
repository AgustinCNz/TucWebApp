import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useAuthStore } from './store/useAuthStore'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  const { user, setUser, clearUser } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
      } else {
        clearUser()
      }
    })
    return () => unsubscribe()
  }, [setUser, clearUser])

  // Mostrar login si no está logueado
  if (!user) return <Login />

  // Si está logueado, mostrar landing o panel
  return <Home />
}

export default App
// Este componente App maneja la autenticación del usuario utilizando Firebase.
// Utiliza Zustand para almacenar el estado del usuario y muestra la página de login si no está logueado.