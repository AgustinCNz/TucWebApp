import { useEffect, useState, useMemo } from 'react'
import clsx from 'clsx'

import { useAuthStore } from '@/store/useAuthStore'
import { useFinanceStore } from '@/store/useFinanceStore'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'

export default function FinanzasPage () {
  const { user } = useAuthStore()
  const { list, fetchAll, add, remove } = useFinanceStore()

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    tipo: 'ingreso',
    categoria: '',
    monto: '',
    fecha: '',
    nota: ''
  })

  /* filtros */
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  /* cargar datos cada vez que cambian filtros */
  useEffect(() => {
    fetchAll(user.uid, { month, year })
  }, [user.uid, month, year, fetchAll])

  /* saldo total */
  const total = useMemo(
    () =>
      list.reduce(
        (acc, m) => acc + (m.tipo === 'ingreso' ? m.monto : -m.monto),
        0
      ),
    [list]
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    await add({
      uid_owner: user.uid,
      ...form,
      monto: parseFloat(form.monto)
    })
    reset()
  }

  const reset = () => {
    setForm({ tipo: 'ingreso', categoria: '', monto: '', fecha: '', nota: '' })
    setOpen(false)
  }

  return (
    <div className='max-w-5xl mx-auto'>
      {/* header */}
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>Finanzas</h2>
        <Button onClick={() => setOpen(true)}>+ Nuevo movimiento</Button>
      </div>

      {/* filtros */}
      <div className='flex gap-4 mb-4'>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className='border rounded px-3 py-1'
        >
          <option value=''>Mes</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className='border rounded px-3 py-1'
        >
          <option value=''>Año</option>
          {[2024, 2025, 2026].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <div className='ml-auto font-semibold'>
          Saldo:&nbsp;${total.toFixed(2)}
        </div>
      </div>

      {/* tabla movimientos */}
      <div className='bg-white rounded shadow overflow-x-auto'>
        <table className='min-w-full text-sm'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-2'>Fecha</th>
              <th className='px-4 py-2'>Tipo</th>
              <th className='px-4 py-2'>Categoría</th>
              <th className='px-4 py-2'>Monto</th>
              <th className='px-4 py-2 w-24'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.map((m) => (
              <tr key={m.id} className='border-t'>
                <td className='px-4 py-2'>
                  {new Date(m.fecha).toLocaleDateString()}
                </td>
                <td className='px-4 py-2 capitalize'>{m.tipo}</td>
                <td className='px-4 py-2'>{m.categoria}</td>
                <td
                  className={clsx(
                    'px-4 py-2',
                    m.tipo === 'ingreso' ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {m.tipo === 'ingreso' ? '+' : '-'}${m.monto}
                </td>
                <td className='px-4 py-2'>
                  <Button
                    size='sm'
                    variant='destructive'
                    onClick={() => remove(m.id)}
                  >
                    Borrar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal */}
      <Dialog
        open={open}
        onOpenChange={reset}
        title='Nuevo movimiento'
      >
        <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
          {/* tipo + monto */}
          <div className='flex gap-4'>
            <select
              name='tipo'
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              className='border rounded px-3 py-2'
            >
              <option value='ingreso'>Ingreso</option>
              <option value='egreso'>Egreso</option>
            </select>

            <input
              type='number'
              step='0.01'
              placeholder='Monto'
              value={form.monto}
              onChange={(e) => setForm({ ...form, monto: e.target.value })}
              className='flex-1 border rounded px-3 py-2'
              required
            />
          </div>

          {/* fecha */}
          <input
            type='date'
            value={form.fecha}
            onChange={(e) => setForm({ ...form, fecha: e.target.value })}
            className='border rounded px-3 py-2 w-full'
            required
          />

          {/* categoria */}
          <input
            type='text'
            placeholder='Categoría'
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            className='border rounded px-3 py-2 w-full'
          />

          {/* nota */}
          <textarea
            rows='3'
            placeholder='Nota'
            value={form.nota}
            onChange={(e) => setForm({ ...form, nota: e.target.value })}
            className='border rounded px-3 py-2 w-full'
          />

          <div className='flex justify-end gap-4'>
            <Button type='button' variant='ghost' onClick={reset}>
              Cancelar
            </Button>
            <Button type='submit'>Guardar</Button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}
// This file is part of the TucWeb project, a web application for managing finances.
// It provides a dashboard for users to track their financial movements, including income and expenses.