// src/pages/Home.jsx
// -----------------------------------------------------------------------------
// Landing pública principal. Renderiza secciones de marketing y muestra un
// botón para ir al dashboard si el usuario ya está logueado.
// -----------------------------------------------------------------------------

import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Servicios from '../components/Servicios'
import ComoFunciona from '../components/ComoFunciona'
import QuienesSomos from '../components/QuienesSomos'
import ContactoForm from '../components/ContactoForm'
import Footer from '../components/Footer'

export default function Home () {
  const { user } = useAuthStore()

  return (
    <>
      <Navbar />

      {/* Agregamos padding-top para compensar navbar fixed */}
      <main className='pt-20'>
        <Hero />

        {/* Botón visible solo si hay sesión */}
        {user && (
          <div className='text-center mt-10'>
            <Link
              to='/dashboard'
              className='bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition'
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


// Sugerencias

// Implementá lazy loading de secciones (React.lazy) para reducir bundle inicial.

// Usa react-scroll para scroll suave desde Navbar a secciones (#id).