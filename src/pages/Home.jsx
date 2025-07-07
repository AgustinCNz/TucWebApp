// Importa todos los componentes que forman la landing
import Hero from '../components/Hero'
import QuienesSomos from '../components/QuienesSomos'
import Servicios from '../components/Servicios'
import ComoFunciona from '../components/ComoFunciona'
import ContactoForm from '../components/ContactoForm'

// Renderiza la landing con todas sus secciones ordenadas
export default function Home() {
  return (
    <>
      <Hero />
      <QuienesSomos />
      <Servicios />
      <ComoFunciona />
      <ContactoForm />
    </>
  )
}
