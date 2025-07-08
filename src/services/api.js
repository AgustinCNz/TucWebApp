// api.js — Manejo centralizado de las llamadas al backend

const API_URL = 'http://localhost:3000/api' // luego esto puede ser dinámico según entorno

// Enviar mensaje desde el formulario de contacto
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
