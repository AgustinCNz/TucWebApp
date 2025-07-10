// src/components/Footer.jsx
// -----------------------------------------------------------------------------
// Pie de página con links sociales e info de copyright.
// Utiliza react-icons para los logos.
// -----------------------------------------------------------------------------

import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaEnvelope
  // FaWhatsapp // Descomentar si querés mostrar WhatsApp
} from 'react-icons/fa'

export default function Footer () {
  return (
    <footer className='bg-black text-white py-8 mt-20'>
      <div className='max-w-5xl mx-auto px-4 text-center'>

        {/* Copyright dinámico */}
        <p className='text-sm mb-4'>
          © {new Date().getFullYear()} TucWeb. Todos los derechos reservados.
        </p>

        {/* Íconos sociales */}
        <div className='flex justify-center gap-6 text-xl mb-4'>
          <a
            href='mailto:gustin_correa@hotmail.com'
            target='_blank'
            rel='noopener noreferrer'
            title='Email'
          >
            <FaEnvelope />
          </a>
          <a
            href='https://www.instagram.com/agustin_correa01'
            target='_blank'
            rel='noopener noreferrer'
            title='Instagram'
          >
            <FaInstagram />
          </a>
          <a
            href='https://www.linkedin.com/in/luis-agustin-correa-nu%C3%B1ez-44116a228/'
            target='_blank'
            rel='noopener noreferrer'
            title='LinkedIn'
          >
            <FaLinkedin />
          </a>
          <a
            href='https://github.com/AgustinCNz'
            target='_blank'
            rel='noopener noreferrer'
            title='GitHub'
          >
            <FaGithub />
          </a>
          <a
            href='https://www.facebook.com/fefo2'
            target='_blank'
            rel='noopener noreferrer'
            title='Facebook'
          >
            <FaFacebook />
          </a>
          {/* WhatsApp listo para activar */}
          {/* <a href='https://wa.me/5493812021882' target='_blank' rel='noopener noreferrer' title='WhatsApp'>
            <FaWhatsapp />
          </a> */}
        </div>

        <p className='text-sm'>
          Desarrollado por Luis Agustin Correa Núñez –{' '}
          <a href='https://github.com/AgustinCNz' className='underline'>
            GitHub
          </a>
        </p>
      </div>
    </footer>
  )
}

/* ──────────────────────── Sugerencias ────────────────────────
1. Añadí atributo aria-label a cada link para mejorar accesibilidad.
2. Podés crear un array de redes y mapear para evitar repetir JSX.
-----------------------------------------------------------------*/
