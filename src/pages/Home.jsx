// Importa todos los componentes que forman la landing
// import Hero from '../components/Hero'
// import QuienesSomos from '../components/QuienesSomos'
// import Servicios from '../components/Servicios'
// import ComoFunciona from '../components/ComoFunciona'
// import ContactoForm from '../components/ContactoForm'
import { Link } from 'react-router-dom'

// Renderiza la landing con todas sus secciones ordenadas
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Bienvenido a TucWeb</h1>
      <p className="text-lg text-gray-600 mb-8">Tu plataforma para crear landings auto-administrables.</p>

      <div className="flex gap-4">
        <Link to="/login" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
          Iniciar Sesión
        </Link>
        <Link to="/register" className="bg-white border border-black text-black px-6 py-2 rounded hover:bg-gray-100">
          Registrarse
        </Link>
      </div>
    </div>
  )
  // return (
  //   <>
  //     <Hero />
  //     <QuienesSomos />
  //     <Servicios />
  //     <ComoFunciona />
  //     <ContactoForm />
  //   </>
  // )
}
