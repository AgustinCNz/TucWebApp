// Sección principal de presentación (Hero)
export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-black to-gray-900 text-white py-20 px-5 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Creamos Landing Pages auto-administrables
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Tu negocio en internet en solo minutos. Sin programar. 100% editable.
        </p>
        <a
          href="#contacto"
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
        >
          Quiero mi Landing
        </a>
      </div>
    </section>
  )
}
