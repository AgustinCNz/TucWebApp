import { useAuthStore } from '../../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

export default function UpgradeBanner() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  if (user?.plan !== 'free') return null

  return (
    <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-2">Desbloqueá funciones premium 🚀</h2>
      <p className="mb-4">
        Accedé a estadísticas, más landings, formularios ilimitados y soporte prioritario.
      </p>
      <button
        onClick={() => navigate('/dashboard/upgrade')}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded"
      >
        Quiero ser premium
      </button>
    </div>
  )
}
