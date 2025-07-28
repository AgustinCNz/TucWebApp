// src/pages/dashboard/importaciones/ImportForm.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useImportStore } from '@/store/useImportStore'

export default function ImportForm() {
  const { id } = useParams()                   // Para distinguir creación vs edición
  const navigate = useNavigate()
  const { add, update, getById } = useImportStore()

  const [form, setForm] = useState({
    pedido: '',
    tracking: '',
    costo_usd: '',
    margen_usd: '',
    estado: 'en_camino'
  })

  // Si hay id, precargamos datos de edición
  useEffect(() => {
    if (id) {
      const existing = getById(id)
      if (existing) {
        setForm({
          pedido: existing.pedido,
          tracking: existing.tracking,
          costo_usd: existing.costo_usd,
          margen_usd: existing.margen_usd,
          estado: existing.estado
        })
      }
    }
  }, [id, getById])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (id) {
      await update(id, {
        pedido: form.pedido,
        tracking: form.tracking,
        costo_usd: parseFloat(form.costo_usd),
        margen_usd: parseFloat(form.margen_usd),
        estado: form.estado
      })
    } else {
      await add({
        pedido: form.pedido,
        tracking: form.tracking,
        costo_usd: parseFloat(form.costo_usd),
        margen_usd: parseFloat(form.margen_usd),
        estado: form.estado
      })
    }
    navigate('/importaciones')
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">
        {id ? 'Editar Importación' : 'Nueva Importación'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pedido */}
        <div>
          <label className="block mb-1">Pedido</label>
          <input
            name="pedido"
            value={form.pedido}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Tracking */}
        <div>
          <label className="block mb-1">Tracking Number</label>
          <input
            name="tracking"
            value={form.tracking}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Costos y márgenes */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">Costo (USD)</label>
            <input
              type="number"
              step="0.01"
              name="costo_usd"
              value={form.costo_usd}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Margen (USD)</label>
            <input
              type="number"
              step="0.01"
              name="margen_usd"
              value={form.margen_usd}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Estado */}
        <div>
          <label className="block mb-1">Estado</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="en_camino">En camino</option>
            <option value="en_miami">En Miami</option>
            <option value="en_bsas">En BsAs</option>
            <option value="entregado">Entregado</option>
          </select>
        </div>

        {/* Botón */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}
