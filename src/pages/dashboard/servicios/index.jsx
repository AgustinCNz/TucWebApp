import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useServiceStore } from '@/store/useServiceStore'
import { useClientStore } from '@/store/useClientStore'      // para el select
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'

export default function ServiciosPage () {
  const { user } = useAuthStore()
  const { list, fetchAll, add, update, remove } = useServiceStore()
  const { list: clients, fetchAll: fetchClients } = useClientStore()

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    client_id: '',
    tipo: 'importacion',
    descripcion: '',
    estado: 'pendiente'
  })

  /* cargas iniciales */
  useEffect(() => {
    fetchAll(user.uid)
    fetchClients(user.uid)
  }, [user.uid, fetchAll, fetchClients])

  /* handlers */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editing) {
      await update(editing.id, form)
    } else {
      await add(form)
    }
    reset()
  }

  const reset = () => {
    setForm({ client_id: '', tipo: 'importacion', descripcion: '', estado: 'pendiente' })
    setEditing(null)
    setOpen(false)
  }

  const handleEdit = (s) => {
    setEditing(s)
    setForm({
      client_id: s.client_id,
      tipo: s.tipo,
      descripcion: s.descripcion,
      estado: s.estado
    })
    setOpen(true)
  }

  /* UI */
  return (
    <div className='max-w-5xl mx-auto mt-8'>
      <div className='flex justify-between mb-6'>
        <h2 className='text-2xl font-bold'>Servicios</h2>
        <Button onClick={() => setOpen(true)}>+ Nuevo servicio</Button>
      </div>

      <div className='overflow-x-auto bg-white rounded shadow'>
        <table className='min-w-full text-sm'>
          <thead className='bg-gray-100 text-left'>
            <tr>
              <th className='px-4 py-2'>Cliente</th>
              <th className='px-4 py-2'>Tipo</th>
              <th className='px-4 py-2'>Estado</th>
              <th className='px-4 py-2 w-40'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.map((s) => (
              <tr key={s.id} className='border-t'>
                <td className='px-4 py-2'>{s.cliente}</td>
                <td className='px-4 py-2 capitalize'>{s.tipo}</td>
                <td className='px-4 py-2'>{s.estado}</td>
                <td className='px-4 py-2 flex gap-2'>
                  <Button size='sm' onClick={() => handleEdit(s)}>Editar</Button>
                  <Button size='sm' variant='destructive' onClick={() => remove(s.id)}>
                    Borrar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={reset} title={editing ? 'Editar servicio' : 'Nuevo servicio'}>
        <form onSubmit={handleSubmit} className='space-y-4 mt-4'>

          {/* Cliente */}
          <div>
            <label className='block text-sm mb-1'>Cliente</label>
            <select
              name='client_id'
              value={form.client_id}
              onChange={handleChange}
              required
              className='w-full border rounded px-3 py-2'
            >
              <option value='' disabled>Seleccionar…</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          {/* Tipo */}
          <div>
            <label className='block text-sm mb-1'>Tipo</label>
            <select
              name='tipo'
              value={form.tipo}
              onChange={handleChange}
              className='w-full border rounded px-3 py-2'
            >
              <option value='importacion'>Importación</option>
              <option value='inmueble'>Inmueble</option>
              <option value='landing'>Landing</option>
            </select>
          </div>

          {/* Descripción */}
          <div>
            <label className='block text-sm mb-1'>Descripción</label>
            <textarea
              name='descripcion'
              value={form.descripcion}
              onChange={handleChange}
              rows='3'
              className='w-full border rounded px-3 py-2'
            ></textarea>
          </div>

          {/* Estado */}
          <div>
            <label className='block text-sm mb-1'>Estado</label>
            <select
              name='estado'
              value={form.estado}
              onChange={handleChange}
              className='w-full border rounded px-3 py-2'
            >
              <option value='pendiente'>Pendiente</option>
              <option value='activo'>Activo</option>
              <option value='finalizado'>Finalizado</option>
            </select>
          </div>

          <div className='flex justify-end gap-4'>
            <Button type='button' variant='ghost' onClick={reset}>Cancelar</Button>
            <Button type='submit'>Guardar</Button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}
