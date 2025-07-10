import Hero from '../components/Hero'
import Servicios from '../components/Servicios'
import ComoFunciona from '../components/ComoFunciona'
import QuienesSomos from '../components/QuienesSomos'
import ContactoForm from '../components/ContactoForm'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'

export default function Home() {
  const { user } = useAuthStore()

  return (
    <>
      <Navbar />

      <main className="pt-20">
        <Hero />

        {/* Mostrar botón si el usuario está logueado */}
        {user && (
          <div className="text-center mt-10">
            <Link
              to="/dashboard"
              className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
            >
              Ir a mi panel
            </Link>
          </div>
        )}

        <Servicios />
        <ComoFunciona />
        <QuienesSomos />
        <ContactoForm />
      </main>

      <Footer />
    </>
  )
}
