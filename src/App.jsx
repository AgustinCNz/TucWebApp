// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import ImportsLayout from '@/layouts/ImportsLayout'                      // Layout de Importaciones
import ListImports from '@/pages/dashboard/importaciones/ListImports'    // Listado
import ImportForm from '@/pages/dashboard/importaciones/ImportForm'      // Crear/Editar
import ImportItemsPage from '@/pages/dashboard/importaciones/ImportItems'// Ítems

export default function App() {
  return (
    <Routes>
      {/* Redirige raíz a Importaciones */}
      <Route path="/" element={<Navigate to="/importaciones" replace />} />

      {/* Módulo Importaciones */}
      <Route path="/importaciones" element={<ImportsLayout />}>
        {/* /importaciones → listado */}
        <Route index element={<ListImports />} />

        {/* /importaciones/new → crear nueva importación */}
        <Route path="new" element={<ImportForm />} />

        {/* /importaciones/:id/edit → editar existente */}
        <Route path=":id/edit" element={<ImportForm />} />

        {/* /importaciones/items/:id → ver/editar ítems */}
        <Route path="items/:id" element={<ImportItemsPage />} />
      </Route>

      {/* Cualquier otra ruta → /importaciones */}
      <Route path="*" element={<Navigate to="/importaciones" replace />} />
    </Routes>
  )
}
