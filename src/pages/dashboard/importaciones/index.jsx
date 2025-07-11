import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useImportStore } from '@/store/useImportStore'
import { useClientStore } from '@/store/useClientStore'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import clsx from 'clsx'

export default function ImportacionesPage () {
  const { user } = useAuthStore()
  const { list, fetchAll, add, update, remove } = useImportStore()
  const { list: clients, fetchAll: fetchClients } = useClientStore()

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    client_id: '',
    pedido: '',
    tracking: '',
    costo_usd: '',
    margen_usd: '',
    estado: 'en_camino'
  })

  /* carga inicial */
  useEffect(() => {
    fetchAll(user.uid)
    fetchClients(user.uid)
  }, [user.uid, fetchAll, fetchClients])

  /* helpers */
  const estados = [
    'en_camino',
    'en_miami',
    'en_bsas',
    'entregado'
  ]

  const handleSubmit = async e => {
    e.preventDefault()
    const payload = {
      ...form,
      costo_usd: parseFloat(form.costo_usd || 0),
      margen_usd: parseFloat(form.margen_usd || 0)
    }
    if (editing) {
      await update(editing.id, payload)
    } else {
      await add(payload)
    }
    reset()
  }

  const reset = () => {
    setForm({
      client_id: '',
      pedido: '',
      tracking: '',
      costo_usd: '',
      margen_usd: '',
      estado: 'en_camino'
    })
    setEditing(null)
    setOpen(false)
  }

  const handleEdit = imp => {
    setEditing(imp)
    setForm({
      client_id: imp.client_id,
      pedido: imp.pedido,
      tracking: imp.tracking,
      costo_usd: imp.costo_usd,
      margen_usd: imp.margen_usd,
      estado: imp.estado
    })
    setOpen(true)
  }

  /* UI */
  return (
    <div className='max-w-6xl mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>Importaciones</h2>
        <Button onClick={() => setOpen(true)}>+ Nueva importación</Button>
      </div>

      <div className='overflow-x-auto bg-white rounded shadow'>
        <table className='min-w-full text-sm'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-3 py-2'>Cliente</th>
              <th className='px-3 py-2'>Pedido</th>
              <th className='px-3 py-2'>Tracking</th>
              <th className='px-3 py-2'>Costo USD</th>
              <th className='px-3 py-2'>Margen</th>
              <th className='px-3 py-2'>Estado</th>
              <th className='px-3 py-2 w-28'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.map(i => (
              <tr key={i.id} className='border-t'>
                <td className='px-3 py-2'>{i.cliente}</td>
                <td className='px-3 py-2'>{i.pedido}</td>
                <td className='px-3 py-2'>{i.tracking}</td>
                <td className='px-3 py-2'>${i.costo_usd}</td>
                <td className='px-3 py-2'>${i.margen_usd}</td>
                <td className={clsx('px-3 py-2 capitalize', i.estado === 'entregado' && 'text-green-600')}>
                  {i.estado.replace('_', ' ')}
                </td>
                <td className='px-3 py-2 flex gap-2'>
                  <Button size='sm' onClick={() => handleEdit(i)}>Editar</Button>
                  <Button size='sm' variant='destructive' onClick={() => remove(i.id)}>Borrar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={reset} title={editing ? 'Editar importación' : 'Nueva importación'}>
        <form onSubmit={handleSubmit} className='space-y-4 mt-4'>

          {/* cliente */}
          <select
            name='client_id'
            value={form.client_id}
            onChange={e => setForm({ ...form, client_id: e.target.value })}
            required
            className='border rounded px-3 py-2 w-full'
          >
            <option value='' disabled>Seleccionar cliente…</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>

          {/* pedido y tracking */}
          <input
            type='text'
            placeholder='Pedido'
            value={form.pedido}
            onChange={e => setForm({ ...form, pedido: e.target.value })}
            className='border rounded px-3 py-2 w-full'
            required
          />
          <input
            type='text'
            placeholder='Tracking'
            value={form.tracking}
            onChange={e => setForm({ ...form, tracking: e.target.value })}
            className='border rounded px-3 py-2 w-full'
          />

          {/* costos */}
          <div className='flex gap-4'>
            <input
              type='number'
              step='0.01'
              placeholder='Costo USD'
              value={form.costo_usd}
              onChange={e => setForm({ ...form, costo_usd: e.target.value })}
              className='flex-1 border rounded px-3 py-2'
            />
            <input
              type='number'
              step='0.01'
              placeholder='Margen USD'
              value={form.margen_usd}
              onChange={e => setForm({ ...form, margen_usd: e.target.value })}
              className='flex-1 border rounded px-3 py-2'
            />
          </div>

          {/* estado */}
          <select
            name='estado'
            value={form.estado}
            onChange={e => setForm({ ...form, estado: e.target.value })}
            className='border rounded px-3 py-2 w-full'
          >
            {estados.map(st => (
              <option key={st} value={st}>{st.replace('_', ' ')}</option>
            ))}
          </select>

          <div className='flex justify-end gap-4'>
            <Button type='button' variant='ghost' onClick={reset}>Cancelar</Button>
            <Button type='submit'>Guardar</Button>
          </div>
        </form>
      </Dialog>
    </div>
  )}