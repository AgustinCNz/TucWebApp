// api.js — Manejo centralizado de las llamadas al backend

const API_URL = 'http://localhost:3000/api' // luego esto puede ser dinámico según entorno



// 📨 Enviar mensaje desde el formulario de contacto
export const enviarContacto = async (data) => {
  try {
    const res = await fetch(`${API_URL}/contacto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error('Error al enviar formulario')
    return await res.json()
  } catch (error) {
    console.error('API error:', error.message)
    throw error
  }
}

// 🆕 Registrar usuario en base de datos local al mismo tiempo que en Firebase
export const registrarUsuarioDB = async ({ uid, email, plan = 'free' }) => {
  try {
    const res = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, email, plan }),
    })

    if (!res.ok) throw new Error('Error al registrar usuario en DB')
    return await res.json()
  } catch (error) {
    console.error('API error (registro usuario):', error.message)
    throw error
  }
}
// 🆕 Obtener datos del usuario por UID


// Obtener datos del usuario desde la base de datos local
export const obtenerUsuario = async (uid) => {
  try {
    const res = await fetch(`${API_URL}/usuarios/${uid}`)
    if (!res.ok) throw new Error('Error al obtener usuario')
    return await res.json()
  } catch (error) {
    console.error('API error:', error.message)
    throw error
  }
}
// 🆕 Actualizar datos del usuario en la base de datos loca  l

export const enviarUsuario = async (data) => {
  try {
    const res = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error('No se pudo guardar el usuario')
    return await res.json()
  } catch (error) {
    console.error('Error al enviar usuario:', error)
    throw error
  }
}
// 🆕 Actualizar datos del usuario en la base de datos local
export const actualizarUsuario = async (uid, data) => {
  try {
    const res = await fetch(`${API_URL}/usuarios/${uid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error('No se pudo actualizar el usuario')
    return await res.json()
  } catch (error) {
    console.error('Error al actualizar usuario:', error)
    throw error
  }
}

// 🆕 Crear una nueva landing page
export async function crearLanding(data) {
  const response = await fetch('http://localhost:3000/api/landings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Error al crear landing')
  return await response.json()
}

export async function obtenerLandings(uid) {
  const response = await fetch(`http://localhost:3000/api/landings/${uid}`)
  if (!response.ok) throw new Error('Error al obtener landings')
  return await response.json()
}

const API = 'http://localhost:3000/api'

export const obtenerLandingPorId = async (id) => {
  const res = await fetch(`${API_URL}/landings/${id}`)
  if (!res.ok) throw new Error('Error al obtener landing por ID')
  return await res.json()
}
