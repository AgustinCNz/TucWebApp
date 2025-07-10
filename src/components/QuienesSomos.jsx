// src/components/QuienesSomos.jsx
// -----------------------------------------------------------------------------
// Sección “¿Quiénes somos?” – texto institucional.
// -----------------------------------------------------------------------------

export default function QuienesSomos () {
  return (
    <section className='bg-white text-gray-900 py-16 px-5' id='quienes-somos'>
      <div className='max-w-4xl mx-auto text-center'>
        <h2 className='text-3xl md:text-4xl font-bold mb-6'>¿Quiénes Somos?</h2>

        <p className='text-lg leading-relaxed'>
          Somos un equipo apasionado por el desarrollo web y los negocios
          digitales. Creamos Landing Pages profesionales, rápidas y
          auto-administrables para emprendedores, marcas personales y empresas
          que quieren tener presencia online sin complicaciones.
        </p>

        <p className='text-lg mt-4 leading-relaxed'>
          Nuestro objetivo es que puedas tener tu página web lista en minutos,
          editable y con todo lo necesario para empezar a vender, comunicar y
          posicionarte.
        </p>
      </div>
    </section>
  )
}

/* ──────────────────────── Sugerencias ────────────────────────
1. Añadí foto/equipo con <img> o <AvatarGroup> para humanizar la sección.
2. Usa i18n (react-i18next) si vas a soportar varios idiomas.
-----------------------------------------------------------------*/
