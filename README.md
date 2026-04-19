# 📖 La Biblia — Ciudad Maderas

> **La Biblia** es una plataforma integral de gestión de conocimiento interno para Ciudad Maderas. Combina una arquitectura moderna con **Inteligencia Artificial (Google Gemini Flash)** para ofrecer un buscador inteligente que responde dudas específicas basadas exclusivamente en la documentación oficial de la empresa, usando el patrón **RAG (Retrieval-Augmented Generation)**.

---

## 📋 Tabla de contenidos

- [Arquitectura del proyecto](#-arquitectura-del-proyecto)
- [Requisitos previos](#-requisitos-previos)
- [Instalación y configuración](#-instalación-y-configuración)
- [Cómo ejecutar el proyecto](#-cómo-ejecutar-el-proyecto)
- [Detalles técnicos clave](#-detalles-técnicos-clave)
- [Características destacadas](#-características-destacadas)
- [Seguridad](#-seguridad)

---

## 🏗️ Arquitectura del proyecto

El ecosistema está dividido en dos partes principales que se comunican de forma fluida:

```
la-biblia/
├── backend/          # Servidor Node.js + Express + MongoDB
│   ├── src/
│   │   ├── Models/   # Esquemas de Mongoose
│   │   ├── Routes/   # Endpoints de la API
│   │   ├── app.js    # Punto de entrada del servidor
│   │   └── seed.js   # Script de carga de datos
│   └── .env          # Variables de entorno (no incluido en git)
│
└── frontend/         # Cliente React + Vite
    ├── src/
    │   ├── components/  # Sidebar, ChatWidget, etc.
    │   ├── pages/       # Home, Section, Solicitudes
    │   └── services/    # Llamadas a la API (axios)
    └── .env             # Variables de entorno (no incluido en git)
```

### Backend `/backend`

| Elemento | Detalle |
|---|---|
| **Runtime** | Node.js (ES Modules) |
| **Framework** | Express |
| **Base de datos** | MongoDB Atlas (Mongoose) |
| **IA** | Google Generative AI SDK (Gemini Flash) |
| **Propósito** | Gestión de datos, búsqueda semántica y procesamiento de lenguaje natural |

### Frontend `/frontend`

| Elemento | Detalle |
|---|---|
| **Framework** | React 18 + Vite |
| **HTTP Client** | Axios |
| **Estilos** | CSS Variables + animaciones fluidas |
| **Propósito** | Interfaz de usuario intuitiva con soporte de modo oscuro y sistema de solicitudes en tiempo real |

---

## ✅ Requisitos previos

Asegúrate de tener instalado lo siguiente antes de comenzar:

- [Node.js](https://nodejs.org/) v18 o superior
- [Git](https://git-scm.com/)
- Una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas) con un cluster activo
- Una API Key de [Google AI Studio](https://aistudio.google.com/) para Gemini

---

## 🚀 Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/gaddielB09/LaBiblia-Ciudad-Maderas.git
cd la-biblia
```

---

### 2. Configuración del Backend

Entra a la carpeta del servidor e instala las dependencias:

```bash
cd backend
npm install
```

Crea el archivo `.env` en la raíz de `/backend`:

```env
PORT=4000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/la-biblia?retryWrites=true&w=majority
GEMINI_API_KEY=TU_API_KEY_AQUÍ
CLIENT_URL=http://localhost:5173
```

> ⚠️ Reemplaza `<usuario>` y `<password>` con las credenciales de tu usuario en MongoDB Atlas. El nombre de la base de datos al final del URI (`la-biblia`) se creará automáticamente si no existe.

---

### 3. Poblar la base de datos

Para que el buscador y la IA funcionen correctamente, es vital cargar los datos iniciales. El script `seed.js` limpia la colección existente e inserta todos los documentos con sus índices de búsqueda:

```bash
# Dentro de la carpeta /backend
npm run seed
```

Si el seed fue exitoso verás en la terminal:

```
MongoDB conectado
✅ Seed completado con X secciones
```

> ⚠️ **Importante:** El script `seed.js` borra y recrea todos los documentos cada vez que se ejecuta. Úsalo con precaución en producción.

---

### 4. Configuración del Frontend

Abre una nueva terminal, entra a la carpeta del cliente e instala las dependencias:

```bash
cd frontend
npm install
```

Crea el archivo `.env` en la raíz de `/frontend`:

```env
VITE_API_URL=http://localhost:4000/api
```

---

## 🚦 Cómo ejecutar el proyecto

Para el desarrollo local es necesario mantener ambos servidores activos simultáneamente.

### Terminal 1 — Servidor Backend

```bash
cd backend
npm run dev
```

El servidor estará disponible en: `http://localhost:4000`

### Terminal 2 — Cliente Frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

---

## 🔧 Detalles técnicos clave

### El script de semilla (`seed.js`)

Este archivo es el corazón del contenido de la plataforma. Realiza tres tareas críticas:

1. **Define la estructura** de todas las secciones: título, slug, categoría, orden, tags y contenido en Markdown.
2. **Crea un índice de texto** en MongoDB sobre los campos `title`, `content` y `tags`, permitiendo que el buscador encuentre información de forma rápida y eficiente.
3. **Sincroniza el conocimiento** que la IA utilizará como contexto en el chat.

### Integración de IA — Flujo RAG

El sistema utiliza el patrón **Retrieval-Augmented Generation**:

```
Usuario escribe una pregunta en el Chat
        │
        ▼
Backend busca en MongoDB las secciones más relevantes
usando búsqueda full-text ($text index)
        │
        ▼
El contenido encontrado se pasa a Gemini como "contexto oficial"
        │
        ▼
Gemini genera una respuesta basada ÚNICAMENTE en esos datos
evitando alucinaciones y asegurando veracidad corporativa
        │
        ▼
El usuario recibe una respuesta precisa y verificable
```

Este enfoque garantiza que la IA **nunca invente información** que no esté en la documentación oficial de Ciudad Maderas.

### Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/sections` | Lista todas las secciones (para el sidebar) |
| `GET` | `/api/sections/:slug` | Obtiene el contenido de una sección específica |
| `GET` | `/api/search?q=...` | Búsqueda full-text en MongoDB |
| `POST` | `/api/chat` | Consulta al chat con IA (RAG + Gemini) |

---

## ✨ Características destacadas

- 🤖 **Búsqueda con IA** — Respuestas inteligentes usando el modelo Gemini Flash con contexto real de la empresa.
- 🌙 **Modo oscuro/claro** — Interfaz adaptable con animaciones fluidas y persistencia de preferencia.
- 📋 **Sistema de solicitudes** — Colección dedicada en MongoDB para capturar ideas y reportes de usuarios directamente desde la app.
- ⚡ **Arquitectura escalable** — Separación clara entre lógica de negocio (backend) y presentación (frontend).
- 🔍 **Sidebar dinámico** — El menú de navegación se construye automáticamente desde la base de datos.

---

## 🛡️ Seguridad

- Los archivos `.env` están excluidos del repositorio mediante `.gitignore` para proteger las credenciales de MongoDB y las API Keys de Google.
- Se recomienda rotar la `GEMINI_API_KEY` periódicamente desde [Google AI Studio](https://aistudio.google.com/).
- Las credenciales de la base de datos deben pertenecer a un usuario con los **permisos mínimos necesarios** (solo lectura/escritura en la base de datos del proyecto).
