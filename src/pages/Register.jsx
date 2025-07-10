// src/pages/Register.jsx
// -----------------------------------------------------------------------------
// Registro de usuario: crea cuenta en Firebase Auth y la guarda en MySQL.
// -----------------------------------------------------------------------------

import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { registrarUsuarioDB } from '../services/api'
import { Link } from 'react-router-dom'

export default function Register () {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      // Firebase
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      )

      // MySQL
      await registrarUsuarioDB({
        uid: cred.user.uid,
        email: form.email,
        plan: 'free'
      })

      setSuccess('¡Usuario creado exitosamente!')
      setForm({ email: '', password: '' })
    } catch (err) {
      setError('Ocurrió un error: ' + err.message)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Crear cuenta</h2>

        {error && <div className='text-red-600 mb-4'>{error}</div>}
        {success && <div className='text-green-600 mb-4'>{success}</div>}

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

          <button className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition'>
            Registrarme
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

// Fuerza requisitos de contraseña (mín 8 chars).

// Enviar email de verificación con sendEmailVerification