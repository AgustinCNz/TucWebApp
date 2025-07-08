import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../lib/firebase"
import { registrarUsuarioDB } from '../services/api' // función que guarda el usuario en tu MySQL

export default function Register() {
  // Estado para el formulario
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  // Estados para mostrar errores y confirmación
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Maneja cambios en los inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Maneja el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      // 1️⃣ Registro en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      )

      const user = userCredential.user // Obtenemos el usuario creado
      const uid = user.uid

      // 2️⃣ Registro en la base de datos local (MySQL)
      await registrarUsuarioDB({
        uid,
        email: form.email,
        plan: "free", // plan por defecto
      })

      // 3️⃣ Reset del formulario y éxito
      setSuccess("¡Usuario creado exitosamente!")
      setForm({ email: "", password: "" })

    } catch (err) {
      setError("Ocurrió un error: " + err.message)
    }
  }

  // Interfaz visual del formulario
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Registrarme
          </button>
        </form>
      </div>
    </div>
  )
}
