// Punto de entrada principal de React
import React from 'react'
import ReactDOM from 'react-dom/client'

// Componente raíz de la app
import App from './App.jsx'

// Importa estilos globales de Tailwind CSS
import './index.css'

// Renderiza la app dentro del div #root en index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
