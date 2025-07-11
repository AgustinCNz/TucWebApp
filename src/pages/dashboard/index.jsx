import { Link } from 'react-router-dom'

export default function Dashboard () {
  return (
    <div className='max-w-lg mx-auto mt-10 space-y-4 text-center'>
      <h2 className='text-3xl font-bold'>Bienvenido a tu panel 🎉</h2>

      <Link to='/dashboard/landing' className='block bg-blue-600 text-white px-4 py-2 rounded'>
        Ver mis landings
      </Link>

      <Link to='/dashboard/crear-landing' className='block bg-green-600 text-white px-4 py-2 rounded'>
        Crear nueva landing
      </Link>
    </div>
  )
}
