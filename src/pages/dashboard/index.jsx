import UpgradeBanner from './UpgradeBanner'
import EstadisticasPremium from './EstadisticasPremium'

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bienvenido a tu panel</h1>
      {/* Banner de actualización de plan */}
      <UpgradeBanner />
      



      {/* Sección exclusiva para usuarios premium */}
      <EstadisticasPremium />

      {/* Aquí podés sumar más secciones comunes */}
    </div>
  )
}
