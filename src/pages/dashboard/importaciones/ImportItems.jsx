// src/pages/dashboard/importaciones/ImportItems.jsx
import { useEffect, useState } from 'react'
import { useImportStore } from '@/store/useImportStore'
import { useNavigate, useParams } from 'react-router-dom'

export default function ImportItemsPage() {
  const { id } = useParams()               // id de la importación actual
  const navigate = useNavigate()
  const { listItems, fetchItems, addItem, deleteItem } = useImportStore()

  // Formulario local para agregar un ítem
  const [form, setForm] = useState({
    descripcion: '',
    link: '',
    costo_usd: '',
    cantidad: '',
    imagen_url: ''
  })

  // Al montar, cargamos los ítems de la importación
  useEffect(() => {
    fetchItems(id)
  }, [id, fetchItems])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    await addItem(id, {
      descripcion: form.descripcion,
      link: form.link,
      costo_usd: parseFloat(form.costo_usd),
      cantidad: parseInt(form.cantidad, 10),
      imagen_url: form.imagen_url
    })
    setForm({ descripcion:'', link:'', costo_usd:'', cantidad:'', imagen_url:'' })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Ítems de Importación #{id}</h2>

      {/* Formulario para agregar ítem */}
      <form onSubmit={handleAdd} className="bg-white p-4 shadow rounded space-y-3">
        <div>
          <label className="block mb-1">Descripción</label>
          <input name="descripcion" value={form.descripcion} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block mb-1">Link (respaldo)</label>
          <input name="link" value={form.link} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">Costo USD</label>
            <input name="costo_usd" type="number" step="0.01" value={form.costo_usd}
              onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Cantidad</label>
            <input name="cantidad" type="number" value={form.cantidad}
              onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
        </div>
        <div>
          <label className="block mb-1">URL Imagen</label>
          <input name="imagen_url" value={form.imagen_url} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="text-right">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Agregar Ítem
          </button>
        </div>
      </form>

      {/* Listado de ítems */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Link</th>
              <th className="px-4 py-2">Costo</th>
              <th className="px-4 py-2">Cant.</th>
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {listItems.map(item => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.descripcion}</td>
                <td className="px-4 py-2">
                  {item.link && <a href={item.link} target="_blank" className="text-blue-600 hover:underline">Ver</a>}
                </td>
                <td className="px-4 py-2">${item.costo_usd}</td>
                <td className="px-4 py-2">{item.cantidad}</td>
                <td className="px-4 py-2">
                  {item.imagen_url && <img src={item.imagen_url} alt="" className="h-10 inline-block" />}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteItem(id, item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right">
        <button
          onClick={() => navigate('/importaciones')}
          className="text-gray-600 hover:underline"
        >
          ← Volver al listado
        </button>
      </div>
    </div>
  )
}
