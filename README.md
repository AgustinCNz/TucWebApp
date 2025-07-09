# TucWeb - Plataforma de Landing Pages Auto-administrables

TucWeb es una plataforma desarrollada con **React 19 + Vite + Tailwind CSS + Firebase Auth + Express + MySQL**, que permite a negocios, emprendedores y marcas personales crear su propia landing page en minutos mediante un panel simple e intuitivo.

---

## 🚀 Funcionalidades actuales

- Registro y login de usuarios (Firebase Auth + MySQL)
- Estado de sesión persistente con Zustand
- Dashboard privado personalizado
- Creación de Landing Pages con formulario visual
- Vista de todas las landings creadas por el usuario
- Diseño moderno y responsive con Tailwind CSS
- Enrutado protegido con React Router
- API RESTful con Express.js
- Conexión segura con base de datos MySQL
- Formulario de contacto funcional
- Arquitectura escalable lista para SaaS

---

## 🔐 Tecnologías utilizadas

- **Frontend:**
  - React 19
  - Vite
  - Tailwind CSS
  - Firebase Auth
  - Zustand (estado global)
  - React Router DOM

- **Backend:**
  - Node.js
  - Express
  - MySQL
  - Cors, Dotenv, Fetch

- **Otros:**
  - GitHub como control de versiones
  - Arquitectura modular y escalable
  - Proyecto pensado para SaaS (subdominios, upgrades, etc.)

---

## 📁 Estructura del Proyecto

ChatGPT Plus
Perfecto Luis. Acá tenés el nuevo README.md actualizado al día de hoy, incluyendo todo lo que ya implementaste, corregido y listo para commit.

✅ CONTENIDO PARA README.md (solo copiar y pegar):
markdown
Copiar
Editar
# TucWeb - Plataforma de Landing Pages Auto-administrables

TucWeb es una plataforma desarrollada con **React 19 + Vite + Tailwind CSS + Firebase Auth + Express + MySQL**, que permite a negocios, emprendedores y marcas personales crear su propia landing page en minutos mediante un panel simple e intuitivo.

---

## 🚀 Funcionalidades actuales

- Registro y login de usuarios (Firebase Auth + MySQL)
- Estado de sesión persistente con Zustand
- Dashboard privado personalizado
- Creación de Landing Pages con formulario visual
- Vista de todas las landings creadas por el usuario
- Diseño moderno y responsive con Tailwind CSS
- Enrutado protegido con React Router
- API RESTful con Express.js
- Conexión segura con base de datos MySQL
- Formulario de contacto funcional
- Arquitectura escalable lista para SaaS

---

## 🔐 Tecnologías utilizadas

- **Frontend:**
  - React 19
  - Vite
  - Tailwind CSS
  - Firebase Auth
  - Zustand (estado global)
  - React Router DOM

- **Backend:**
  - Node.js
  - Express
  - MySQL
  - Cors, Dotenv, Fetch

- **Otros:**
  - GitHub como control de versiones
  - Arquitectura modular y escalable
  - Proyecto pensado para SaaS (subdominios, upgrades, etc.)

---

## 📁 Estructura del Proyecto

/TucWeb
│
├── /src
│ ├── components # Componentes reutilizables
│ ├── layouts # Layouts generales como DashboardLayout
│ ├── lib # Firebase config
│ ├── pages # Páginas principales (Login, Register, Dashboard, etc.)
│ ├── services # api.js con todas las funciones de backend
│ ├── store # Zustand store para autenticación
│ ├── App.jsx # Enrutador principal
│ └── main.jsx # Entrada de React
│
├── /backend
│ ├── config # Conexión MySQL
│ ├── controllers # Lógica backend por módulo (usuarios, landings, etc.)
│ ├── routes # Endpoints de la API
│ └── index.js # Servidor Express principal
│
├── .env # Variables de entorno
├── package.json
├── README.md


---

## 🛠 Cómo correr el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/AgustinCNz/TucWeb.git


2. Instalar dependencias
# Frontend
cd TucWeb
npm install

# Backend
cd backend
npm install

3. Configurar .env en /backend

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_pass
DB_NAME=tucweb

4. Iniciar proyecto

# Terminal 1 (frontend)
npm run dev

# Terminal 2 (backend)
npm run dev


📌 Próximos pasos
Editar landings existentes ✅

Eliminar landings

Vista pública con preview personalizado

Subdominios o URLs amigables para cada landing

Planes premium y upgrade por cuenta

Integración con Stripe / MercadoPago

Subida de imágenes (Firebase Storage / Cloudinary)

Despliegue automático en Vercel

👨‍💻 Autor
Luis Agustin Correa Núñez
📍 San Miguel de Tucumán, Argentina
📧 gustin_correa@hotmail.com
🌐 Instagram: @agustin_correa01
💻 GitHub: AgustinCNz