# La Biblia Ciudad Maderas - Backend 🧠

Este es el servidor central de "La Biblia", encargado de gestionar la persistencia de datos en MongoDB, procesar búsquedas de texto y conectar con los modelos avanzados de Google Gemini AI para responder dudas de los usuarios.

## 🛠️ Tecnologías y Herramientas

- **Node.js & Express**: Entorno de ejecución y framework para la API REST.
- **MongoDB & Mongoose**: Base de datos NoSQL y modelado de objetos.
- **Google Generative AI SDK**: Integración con el modelo `gemini-1.5-flash-preview` (o `gemini-pro`).
- **Dotenv**: Manejo de variables de entorno seguras.
- **Cors**: Configuración de seguridad para peticiones desde el frontend.
- **Nodemon**: Herramienta de desarrollo para reinicio automático del servidor.

## 📁 Estructura de Carpetas

backend/
├── src/
│   ├── Models/           # Esquemas de Mongoose (Section, Request)
│   ├── Routes/           # Definición de endpoints (Chat, Search, Sections, Requests)
│   └── app.js            # Punto de entrada y configuración de Express/MongoDB
├── .env                  # Variables sensibles (API Keys, DB URI) - No subir a Git
└── package.json          # Scripts y dependencias del servidor

## ⚙️ Configuración Requerida

1. Variables de Entorno
Es obligatorio crear un archivo .env en la raíz de esta carpeta con los siguientes valores:
PORT=4000
MONGO_URI=mongodb://tu_conexion_a_mongo
GEMINI_API_KEY=tu_clave_de_google_ai_studio
CLIENT_URL=http://localhost:5173

2. Instalación
Para instalar los módulos necesarios:
npm install

3. Ejecución
Para iniciar el servidor en modo desarrollo (con auto-reload):
npm run dev

## 🔌 Endpoints Principales
   Ruta           Método        Descripción
/api/sections      GET          Obtiene todas las secciones de información.
/api/search        GET          Realiza búsquedas por coincidencia de texto en la DB.
/api/chat          POST         Envía una consulta a Gemini AI con contexto de la DB.
/api/requests      POST         Guarda una nueva sugerencia o idea en la colección requests.

## 🤖 Integración con IA
El backend utiliza un sistema de RAG (Retrieval-Augmented Generation) simplificado:
Recibe la pregunta del usuario.
Busca en MongoDB las secciones más relevantes mediante $text search.
Envía ese contenido como contexto a Gemini para asegurar que la IA no "alucine" y responda solo con información oficial de la empresa.