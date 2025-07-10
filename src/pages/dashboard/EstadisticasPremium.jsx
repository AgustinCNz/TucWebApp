import { useAuthStore } from '../../store/useAuthStore'

export default function EstadisticasPremium() {
  const { user } = useAuthStore()

  if (user?.plan !== 'premium') return null

  return (
    <div className="bg-white shadow p-6 rounded-lg max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Estadísticas Premium</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-4 rounded text-center">
          <h3 className="text-xl font-semibold">Visitas Mensuales</h3>
          <p className="text-3xl text-blue-600 mt-2">12,340</p>
        </div>
        <div className="bg-gray-100 p-4 rounded text-center">
          <h3 className="text-xl font-semibold">Landing Pages Activas</h3>
          <p className="text-3xl text-green-600 mt-2">5</p>
        </div>
        <div className="bg-gray-100 p-4 rounded text-center">
          <h3 className="text-xl font-semibold">Formularios Recibidos</h3>
          <p className="text-3xl text-purple-600 mt-2">84</p>
        </div>
      </div>
    </div>
  )
}
