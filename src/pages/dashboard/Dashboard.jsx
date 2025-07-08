import UpgradeBanner from './UpgradeBanner'

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bienvenido a tu panel</h1>
      <UpgradeBanner />
      {/* Resto del contenido del dashboard */}
    </div>
  )
}
// Este componente Dashboard es la página principal del panel de usuario.
// Incluye un banner para actualizar el plan y puede contener más secciones comunes.