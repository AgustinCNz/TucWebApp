export default function Upgrade() {
  return (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Mejorá tu plan</h2>
      <p className="mb-6">Tu cuenta actual es del plan <strong>Free</strong>.</p>

      <p className="mb-4">
        Al actualizar al plan <strong>Premium</strong> desbloqueás funcionalidades exclusivas:
      </p>

      <ul className="list-disc text-left mb-6 ml-6">
        <li>Estadísticas avanzadas de tu landing page</li>
        <li>Más capacidad de almacenamiento</li>
        <li>Acceso prioritario a soporte</li>
        <li>Y mucho más...</li>
      </ul>

      <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
        Activar Premium
      </button>
    </div>
  )
}
