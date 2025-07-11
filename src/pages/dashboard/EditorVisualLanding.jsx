// src/pages/dashboard/EditorVisualLanding.jsx
// -----------------------------------------------------------------------------
// Editor visual con Tiptap + autosave + selector de color (sin conflictos CSS)
// -----------------------------------------------------------------------------

import { useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { obtenerLandingPorId, actualizarLanding } from '../../services/api'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { HexColorPicker } from 'react-colorful'
/* el @import del CSS ya está en src/index.css */

const PALETA = ['#ffffff', '#fef08a', '#d1fae5', '#e0e7ff', '#fee2e2']

export default function EditorVisualLanding () {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { isSubmitting, isDirty }
  } = useForm({
    defaultValues: {
      titulo: '',
      subtitulo: '',
      descripcion: '',
      color_fondo: '#ffffff'
    }
  })

  /* ────── Tiptap ────── */
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: '',
    onUpdate: ({ editor }) => setValue('descripcion', editor.getHTML(), { shouldDirty: true })
  })

  /* ────── Cargar datos BD ────── */
  useEffect(() => {
    (async () => {
      const data = await obtenerLandingPorId(id)
      reset(data)
      editor?.commands.setContent(data.descripcion || '')
    })()
  }, [id, editor, reset])

  /* ────── Autosave cada 5 s ────── */
  const autosaveTimer = useRef(null)

  useEffect(() => {
    if (!isDirty) return                      // nada cambió
    if (isSubmitting) return                  // evitando choque con envío manual

    clearTimeout(autosaveTimer.current)
    autosaveTimer.current = setTimeout(async () => {
      const datos = watch()                  // valores actuales del form
      try {
        await actualizarLanding(id, datos)
        console.log('💾 Autosave OK')
      } catch (err) {
        console.error('Autosave error:', err)
      }
    }, 5000)                                 // 5000 ms = 5 s

    return () => clearTimeout(autosaveTimer.current)
  }, [watch, isDirty, isSubmitting, id])

  /* ────── Envío manual (botón Guardar) ────── */
  const onSubmit = async data => {
    await actualizarLanding(id, data)
    alert('✅ Cambios guardados')
    navigate('/dashboard/landing')
  }

  const liveData = watch()

  return (
    <div className='grid md:grid-cols-2 gap-6 p-6'>
      {/* ===== Formulario (lado izq.) ===== */}
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

        <h2 className='text-2xl font-bold'>Editor de Landing</h2>

        <label className='block font-medium'>
          Título
          <input
            {...register('titulo', { required: true })}
            className='w-full p-2 border rounded mt-1'
            placeholder='Ej.: Cafetería La Esquina'
          />
        </label>

        <label className='block font-medium'>
          Subtítulo
          <input
            {...register('subtitulo')}
            className='w-full p-2 border rounded mt-1'
            placeholder='Ej.: Café de especialidad'
          />
        </label>

        <label className='block font-medium'>
          Descripción
          <div className='border rounded mt-1'>
            <EditorContent editor={editor} className='prose p-2 max-h-64 overflow-y-auto' />
          </div>
        </label>

        <label className='block font-medium'>
          Color de fondo
          <Controller
            control={control}
            name='color_fondo'
            render={({ field }) => (
              <>
                <div className='flex gap-2 mt-2'>
                  {PALETA.map(c => (
                    <button
                      key={c}
                      type='button'
                      onClick={() => field.onChange(c)}
                      className='w-6 h-6 rounded'
                      style={{
                        backgroundColor: c,
                        border: c === field.value ? '2px solid #000' : '1px solid #ccc'
                      }}
                    />
                  ))}
                </div>
                <HexColorPicker color={field.value} onChange={field.onChange} className='mt-2 h-40 w-full' />
              </>
            )}
          />
        </label>

        <button
          type='submit'
          disabled={isSubmitting}
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          {isSubmitting ? 'Guardando…' : 'Guardar cambios'}
        </button>
        <p className='text-xs text-gray-500'>(Se guarda automáticamente cada 5 s)</p>
      </form>

      {/* ===== Vista previa (lado der.) ===== */}
      <div
        className='min-h-full flex items-center justify-center p-4 rounded shadow'
        style={{ backgroundColor: liveData.color_fondo }}
      >
        {/* En mobile, el contenedor usa 100 % width; en desktop se ve al costado */}
        <div className='w-full max-w-md text-center space-y-4 bg-white p-6 rounded-lg'>

          <h1 className='text-3xl font-bold'>{liveData.titulo}</h1>
          <h2 className='text-lg text-gray-600'>{liveData.subtitulo}</h2>

          <div
            className='prose prose-sm mx-auto'
            dangerouslySetInnerHTML={{ __html: liveData.descripcion }}
          />

          <p className='text-xs text-gray-400'>(Vista previa)</p>
        </div>
      </div>
    </div>
  )
}
