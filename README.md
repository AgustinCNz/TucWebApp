# TucWeb - Plataforma de Landing Pages Auto-administrables

TucWeb es una plataforma desarrollada con **React 19 + Vite + Tailwind CSS + Firebase Auth + Express + MySQL**, que permite a negocios, emprendedores y marcas personales crear su propia landing page en minutos mediante un panel simple e intuitivo.

---

## 🚀 Funcionalidades actuales

- Página principal (Landing institucional de TucWeb)
- Registro de usuarios con Firebase Auth
- Almacenamiento de usuarios en MySQL
- Diseño responsive moderno con Tailwind
- Sistema modular pensado para escalar funcionalidades
- Formulario de contacto funcional (envía al backend)

---

## 🔐 Tecnologías utilizadas

- **Frontend:**
  - React 19
  - Vite
  - Tailwind CSS
  - Firebase Auth
  - Zustand (gestión de sesión)
- **Backend:**
  - Node.js
  - Express
  - MySQL
  - Cors y dotenv para seguridad
- **Otros:**
  - GitHub como control de versiones
  - Arquitectura modular profesional

---

## 📁 Estructura del Proyecto

/TucWeb
│
├── /src
│ ├── /components # Componentes reutilizables como Hero, Navbar, Formulario, etc.
│ ├── /pages # Home, Login, Register, Dashboard
│ ├── /services # Conexión con backend (api.js)
│ ├── /store # Zustand (estado global de auth)
│ ├── /lib # Configuración Firebase
│ ├── App.jsx # Enrutador principal
│ └── main.jsx # Entrada del proyecto React
│
├── /backend
│ ├── /controllers # Lógica de negocio de usuarios, contacto, etc.
│ ├── /routes # Endpoints de API
│ ├── /config # Configuración de conexión a MySQL
│ └── index.js # Servidor principal Express
│
├── .env
├── .gitignore
├── package.json
└── README.md


---

## 🛠 Cómo correr el proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/AgustinCNz/TucWeb.git

2. Instalar dependencias (frontend y backend):
``` bash
cd TucWeb
npm install
cd backend
npm install
```
3. Configurar entorno .env en /backend:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_pass
DB_NAME=tucweb

4. Iniciar Frontend y backend:
``` bash
# Terminal 1
npm run dev

# Terminal 2 (dentro de /backend)
npm run dev
```

🧠 Próximas funcionalidades
Login de usuarios y sistema de sesión

Panel privado con rutas protegidas

Generación de landing page personalizada

Planes premium con módulos avanzados

Dominio personalizado o subdominio tipo usuario.tucweb.com

👨‍💻 Autor
Luis Agustin Correa Núñez
📍 San Miguel de Tucumán, Argentina
📧 gustin_correa@hotmail.com
🌐 Instagram: @agustin_correa01
🥷 Github: https://github.com/AgustinCNz

