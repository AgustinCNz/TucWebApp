// src/pages/dashboard/importaciones/ImportItems.jsx
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useClientStore } from '../../../store/useClientStore.js'
import * as importApi from '../../../api/imports.js'
import * as itemApi from '../../../api/import_items.js'
import { Button } from '../../../components/ui/button.jsx'

export default function ImportItemsPage() {
  const navigate = useNavigate()
  const { id: importId } = useParams()
  const { clients } = useClientStore() // Se asume que clients ya fue cargado en algún punto del store

  // Datos generales de la importación
  const [importData, setImportData] = useState({
    client_id: '',
    fecha: '',
    pedido: '',
    courier: '',
    tracking_global: ''
  })

  // Factura, lista de ítems y estado de carga
  const [factura, setFactura] = useState(null)
  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(false)

  // Formulario para ítem (nuevo o edición)
  const [itemForm, setItemForm]         = useState({ concepto: '', cantidad: 1, precio_usd: '', tracking: '', link_url: '' })
  const [files, setFiles]               = useState([])
  const [editingItem, setEditingItem]   = useState(null)

  // Al montar, si hay importId, cargar datos e ítems
  useEffect(() => {
    if (importId) loadImport()
  }, [importId])

  async function loadImport() {
    const data = await importApi.getImport(importId)
    setImportData(data)
    const resp = await importApi.getImportItems(importId)
    setItems(resp)
  }

  // Handler genérico para inputs de importación
  const handleImportChange = e => {
    const { name, value } = e.target
    setImportData(prev => ({ ...prev, [name]: value }))
  }

  // Handler genérico para inputs de ítem
  const handleItemChange = e => {
    const { name, value } = e.target
    setItemForm(prev => ({ ...prev, [name]: value }))
  }

  // Crear u actualizar importación
  const handleImportSave = async () => {
    setLoading(true)
    if (importId) {
      await importApi.updateImport(importId, importData)
    } else {
      const { id } = await importApi.addImport(importData)
      navigate(`/dashboard/importaciones/${id}/items`)
      return
    }
    setLoading(false)
  }

  // Eliminar importación completa
  const handleImportDelete = async () => {
    if (!confirm('¿Eliminar toda la importación?')) return
    await importApi.deleteImport(importId)
    navigate('/dashboard/importaciones')
  }

  // Crear o actualizar ítem
  const handleItemSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    let idSaved
    if (editingItem) {
      await itemApi.updateImportItem(editingItem.id, itemForm)
      idSaved = editingItem.id
    } else {
      const { id } = await itemApi.createImportItem({ import_id: Number(importId), ...itemForm })
      idSaved = id
    }
    if (files.length) {
      await itemApi.uploadImportItemImages(idSaved, files)
    }
    await loadImport()
    resetItemForm()
    setLoading(false)
  }

  // Borrar un ítem específico
  const handleItemDelete = async id => {
    if (!confirm('¿Eliminar este ítem?')) return
    await itemApi.deleteImportItem(id)
    setItems(prev => prev.filter(i => i.id !== id))
  }

  // Preparar la edición de un ítem existente
  const handleItemEdit = item => {
    setEditingItem(item)
    setItemForm({
      concepto: item.concepto,
      cantidad: item.cantidad,
      precio_usd: item.precio_usd,
      tracking: item.tracking,
      link_url: item.link_url
    })
    setFiles([])
  }

  // Resetear formulario de ítem
  function resetItemForm() {
    setEditingItem(null)
    setItemForm({ concepto: '', cantidad: 1, precio_usd: '', tracking: '', link_url: '' })
    setFiles([])
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Importación {importId || '(nueva)'}</h2>

      {/* Datos generales de importación */}
      <div className="bg-white p-6 rounded shadow space-y-2">
        <label>Cliente</label>
        <select name="client_id" value={importData.client_id} onChange={handleImportChange} className="w-full border p-2 rounded">
          <option value="">-- Seleccionar cliente --</option>
          {clients?.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>

        <label>Fecha</label>
        <input type="date" name="fecha" value={importData.fecha} onChange={handleImportChange} className="w-full border p-2 rounded" />

        <label>Pedido</label>
        <input type="text" name="pedido" value={importData.pedido} onChange={handleImportChange} className="w-full border p-2 rounded" />

        <label>Courier</label>
        <input type="text" name="courier" value={importData.courier} onChange={handleImportChange} className="w-full border p-2 rounded" />

        <label>Tracking global</label>
        <input type="text" name="tracking_global" value={importData.tracking_global} onChange={handleImportChange} className="w-full border p-2 rounded" />

        <label>Factura (PDF / IMG)</label>
        <input type="file" accept=".pdf,image/*" onChange={e => setFactura(e.target.files[0])} className="w-full" />

        <div className="flex gap-4 mt-4">
          <Button onClick={handleImportSave} disabled={loading}>{importId ? 'Guardar cambios' : 'Crear importación'}</Button>
          {importId && <Button variant="destructive" onClick={handleImportDelete}>Eliminar importación</Button>}
        </div>
      </div>

      {/* Formulario de ítems */}
      {importId && (
        <form onSubmit={handleItemSubmit} className="bg-white p-6 rounded shadow space-y-4">
          <h3 className="text-xl">{editingItem ? 'Editar ítem' : 'Nuevo ítem'}</h3>

          <label>Concepto</label>
          <input type="text" name="concepto" value={itemForm.concepto} onChange={handleItemChange} className="w-full border p-2 rounded" required />

          <div className="flex gap-4">
            <div className="flex-1">
              <label>Cantidad</label>
              <input type="number" name="cantidad" min={1} value={itemForm.cantidad} onChange={handleItemChange} className="w-full border p-2 rounded" required />
            </div>
            <div className="flex-1">
              <label>Precio USD</label>
              <input type="number" name="precio_usd" step="0.01" value={itemForm.precio_usd} onChange={handleItemChange} className="w-full border p-2 rounded" required />
            </div>
          </div>

          <label>Tracking (opcional)</label>
          <input type="text" name="tracking" value={itemForm.tracking} onChange={handleItemChange} className="w-full border p-2 rounded" />

          <label>Link URL (opcional)</label>
          <input type="url" name="link_url" value={itemForm.link_url} onChange={handleItemChange} className="w-full border p-2 rounded" />

          <label>Imágenes (max 10)</label>
          <input type="file" multiple accept="image/*" onChange={e => setFiles(Array.from(e.target.files))} className="w-full" />

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>{editingItem ? 'Actualizar ítem' : 'Agregar ítem'}</Button>
            {editingItem && <Button variant="outline" onClick={resetItemForm}>Cancelar</Button>}
          </div>
        </form>
      )}

      {/* Listado de ítems */}
      {importId && items.length > 0 && (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-gray-50 p-4 rounded shadow flex justify-between items-start">
              <div>
                <p><strong>{item.concepto}</strong> ×{item.cantidad} — ${item.precio_usd}</p>
                {item.tracking && <p className="text-sm">Track: {item.tracking}</p>}
                {item.link_url && (
                  <a href={item.link_url} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Ver anuncio</a>
                )}
                <div className="flex gap-2 mt-2">
                  {item.images?.map(img => <img key={img.id} src={img.url} className="h-16 rounded" />)}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="sm" onClick={() => handleItemEdit(item)}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => handleItemDelete(item.id)}>Borrar</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
