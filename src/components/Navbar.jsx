import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-black">TucWeb</Link>
      <div className="space-x-4">
        <Link to="/login" className="text-black hover:underline">Login</Link>
        <Link to="/register" className="text-black hover:underline">Registro</Link>
      </div>
    </nav>
  )
}
