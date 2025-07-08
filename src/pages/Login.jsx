import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuthStore } from "../store/useAuthStore";
import { obtenerUsuario } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  // Maneja el cambio en los inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Lógica al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Inicia sesión en Firebase con email y contraseña
      const cred = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const uid = cred.user.uid;

      // Consulta al backend para obtener datos desde MySQL
      const usuario = await obtenerUsuario(uid);

      // Guarda el usuario en el estado global (Zustand)
      setUser(usuario);

      // Redirige al dashboard
      
      navigate("/dashboard");
    } catch (err) {
      setError("Credenciales incorrectas o usuario no registrado");
      console.error("Error al iniciar sesión:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

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
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        <Link to="/" className="block text-center mt-6 text-blue-600 hover:underline">
        Volver al inicio
      </Link>
      </div>
      
    </div>
      
  );
  
}
// Este componente maneja el inicio de sesión de los usuarios
// Utiliza Firebase para autenticar y una API para obtener datos adicionales
