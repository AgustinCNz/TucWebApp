// src/components/ComoFunciona.jsx
// -----------------------------------------------------------------------------
// Sección “¿Cómo funciona?” – muestra el flujo de 3 pasos para obtener una
// landing page. Es 100 % estático: se renderiza con un array de objetos.
// -----------------------------------------------------------------------------

export default function ComoFunciona () {
  // Array con los pasos a mostrar. Fácil de extender o traducir.
  const pasos = [
    {
      titulo: '1. Completá un formulario',
      descripcion:
        'Ingresá el nombre de tu negocio, texto principal y el botón de contacto.'
    },
    {
      titulo: '2. Se genera tu landing',
      descripcion:
        'Nuestro sistema crea automáticamente tu página web en segundos.'
    },
    {
      titulo: '3. Editá desde tu panel',
      descripcion:
        'Accedé con tu usuario y modificá textos, fondo o botón cuando quieras.'
    }
  ]

  return (
    <section className='bg-white py-16 px-5' id='como-funciona'>
      <div className='max-w-5xl mx-auto text-center'>
        <h2 className='text-3xl md:text-4xl font-bold mb-10'>¿Cómo funciona?</h2>

        {/* Grid responsiva: 1 col en mobile, 3 cols en md+ */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {pasos.map((paso, index) => (
            <div
              key={index}
              className='bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition'
            >
              <h3 className='text-xl font-bold mb-2'>{paso.titulo}</h3>
              <p className='text-gray-700'>{paso.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── Sugerencias ────────────────────────
1. Extraé `pasos` a un JSON/config para reutilizar en otros idiomas.
2. Agregá animaciones con Framer Motion para hacer el onboarding más dinámico.
-----------------------------------------------------------------*/
