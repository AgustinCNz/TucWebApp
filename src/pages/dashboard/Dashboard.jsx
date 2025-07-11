import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { Card, CardContent } from '@/components/ui/card'

export default function Dashboard () {
  const { user } = useAuthStore()

  /* atajos con contador dummy (luego conectar a store) */
  const tiles = [
    { to: 'clientes',       label: 'Clientes',       bg: 'bg-blue-600/80' },
    { to: 'servicios',      label: 'Servicios',      bg: 'bg-green-600/80' },
    { to: 'finanzas',       label: 'Finanzas',       bg: 'bg-amber-600/80' },
    { to: 'importaciones',  label: 'Importaciones',  bg: 'bg-purple-600/80' },
    { to: 'inmuebles',      label: 'Inmuebles',      bg: 'bg-pink-600/80' }
  ]

  return (
    <div className='max-w-5xl mx-auto'>
      <h2 className='text-3xl font-bold mb-6'>
        ¡Hola {user?.email?.split('@')[0] || 'usuario'}! 👋
      </h2>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
        {tiles.map(t => (
          <Link key={t.to} to={t.to}>
            <Card className={`${t.bg} text-white hover:opacity-90 transition`}>
              <CardContent className='p-6 flex flex-col items-center'>
                <span className='text-xl font-semibold'>{t.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Espacio para futuras métricas */}
      <div className='mt-10 text-gray-600'>
        📊 Próximamente: resumen de ingresos, egresos y pendientes.
      </div>
    </div>
  )
}
