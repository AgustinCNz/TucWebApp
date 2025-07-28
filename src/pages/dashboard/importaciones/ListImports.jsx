// src/pages/dashboard/importaciones/ListImports.jsx
import { useEffect } from 'react'
import { useImportStore } from '@/store/useImportStore'
import { Link } from 'react-router-dom'

export default function ListImports() {
  const { list, fetchAll } = useImportStore()

  // Al montar, cargamos todas las importaciones
  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mis Importaciones</h2>

      {list.length === 0 ? (
        <p className="text-gray-600">No hay importaciones cargadas.</p>
      ) : (
        <table className="w-full table-auto bg-white shadow rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Pedido</th>
              <th className="px-4 py-2 text-left">Tracking</th>
              <th className="px-4 py-2">Costo (USD)</th>
              <th className="px-4 py-2">Margen (USD)</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.map((imp) => (
              <tr key={imp.id} className="border-t">
                <td className="px-4 py-2">{imp.pedido}</td>
                <td className="px-4 py-2">{imp.tracking}</td>
                <td className="px-4 py-2 text-center">${imp.costo_usd}</td>
                <td className="px-4 py-2 text-center">${imp.margen_usd}</td>
                <td className="px-4 py-2 capitalize text-center">{imp.estado}</td>
                <td className="px-4 py-2 text-center">
                  <Link
                    to={`/importaciones/${imp.id}/edit`}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Editar
                  </Link>
                  <Link
                    to={`/importaciones/items/${imp.id}`}
                    className="text-green-600 hover:underline"
                  >
                    Ítems
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
