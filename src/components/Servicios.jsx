// Sección que muestra los beneficios y servicios que ofrecemos
export default function Servicios() {
  const servicios = [
    {
      titulo: "Diseño profesional",
      descripcion: "Landing moderna, limpia, adaptable a todos los dispositivos.",
    },
    {
      titulo: "Auto-administrable",
      descripcion: "Editá tus textos y botón desde un panel simple e intuitivo.",
    },
    {
      titulo: "Subdominio incluido",
      descripcion: "Tu landing se genera con un subdominio personalizado del tipo minombre.tucweb.com.",
    },
    {
      titulo: "Carga inmediata",
      descripcion: "Tu landing se genera al instante. ¡Sin demoras!",
    },
  ]

  return (
    <section className="bg-gray-100 py-16 px-5" id="servicios">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">¿Qué ofrecemos?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicios.map((servicio, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{servicio.titulo}</h3>
              <p className="text-gray-600">{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
