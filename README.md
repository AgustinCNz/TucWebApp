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
- Registro simultáneo en base de datos MySQL.
- Inicio de sesión validado contra Firebase y MySQL.
- Estado de sesión global con Zustand.
- Rutas protegidas usando React Router.
- Dashboard privado con Layout fijo y botón de logout.
- Navbar inteligente según estado de sesión.

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
/src
├── components # Componentes reutilizables
├── layouts # Layouts principales (ej: DashboardLayout)
├── lib # Config Firebase y libs
├── pages # Vistas principales (Login, Register, Dashboard)
├── services # api.js con requests a backend
├── store # Zustand (auth)
├── App.jsx # Enrutador principal
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

## 🔜 Próximos pasos (Backlog)

1. ✅ Sistema de autenticación con Firebase + MySQL ✔️
2. 🔄 Modularización basada en planes de usuario (FREE / PREMIUM)
3. 📦 Carga dinámica de secciones (ej: estadísticas, herramientas, landing pages)
4. 🎯 Aplicar principios SOLID + Abstract Factory / Method Pattern
5. 🧠 Persistencia de sesión con `onAuthStateChanged`
6. 📈 Sistema de upgrades/pagos por plan
7. 📤 Integración con pasarelas de pago (Stripe / MercadoPago)
8. 🔒 Middleware de protección de rutas y componentes
9. 🧪 Testing de unidades críticas (formulario, login, registro)
10. ☁️ Despliegue en Vercel / Railway / PlanetScale

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

