// src/pages/Login.jsx
// -----------------------------------------------------------------------------
// Formulario de inicio de sesión: autentica con Firebase Auth y recupera datos
// adicionales del backend (MySQL). Guarda user en Zustand y redirige.
// -----------------------------------------------------------------------------

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'

import { useAuthStore } from '../store/useAuthStore'
import { obtenerUsuario } from '../services/api'

import { useNavigate, Link } from 'react-router-dom'

export default function Login () {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { setUser } = useAuthStore()
  const navigate = useNavigate()

  /* ───────────────────────── Handlers ───────────────────────── */
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 1️⃣ Firebase Auth
      const cred = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      )

      // 2️⃣ Backend: datos adicionales
      const usuario = await obtenerUsuario(cred.user.uid)

      // 3️⃣ Guardamos en store y redirigimos
      setUser(usuario)
      navigate('/dashboard')
    } catch (err) {
      setError('Credenciales incorrectas o usuario no registrado')
      console.error('Error al iniciar sesión:', err)
    } finally {
      setLoading(false)
    }
  }

  /* ───────────────────────── UI ───────────────────────── */
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Iniciar sesión</h2>

        {error && <div className='text-red-600 mb-4'>{error}</div>}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block mb-1'>Email</label>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border rounded-md'
            />
          </div>

          <div>
            <label className='block mb-1'>Contraseña</label>
            <input
              type='password'
              name='password'
              value={form.password}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border rounded-md'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition'
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <Link
          to='/'
          className='block text-center mt-6 text-blue-600 hover:underline'
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

// Sugerencias

// Sustituí alertas de error por toasts (react-hot-toast).

// Implementá passwordReset y rememberMe.