// src/main.jsx
// -----------------------------------------------------------------------------
// Punto de entrada de React. Aquí se monta la aplicación sobre <div id="root">.
// -----------------------------------------------------------------------------

import React from 'react'                                    // React core
import ReactDOM from 'react-dom/client'                      // Nuevo API de React 18+
import { BrowserRouter } from 'react-router-dom'             // Enrutador del lado cliente

import App from './App.jsx'                                  // Componente raíz
import './index.css'                                         // Estilos globales Tailwind

// 🔰 Renderizamos en modo estricto para detectar problemas en dev
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter habilita navegación SPA */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
// -----------------------------------------------------------------------------
// Nota: React.StrictMode no afecta al build de producción, solo a desarrollo.

// Sugerencias

// Podés pasar <Router basename="/tuSubCarpeta"> si desplegás en sub-directorio.

// Instalar @tanstack/react-query o similar para manejo de datos/global state.