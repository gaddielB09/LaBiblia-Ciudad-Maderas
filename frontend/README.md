# La Biblia Ciudad Maderas - Frontend 🌿

Este es el cliente web de la plataforma "La Biblia", una herramienta interna diseñada para gestionar secciones, realizar búsquedas inteligentes y enviar solicitudes de soporte o ideas.

## 🚀 Tecnologías Utilizadas

- **React.js**: Biblioteca principal para la interfaz.
- **Vite**: Herramienta de construcción (build tool) ultra rápida.
- **Axios**: Cliente HTTP para comunicación con el Backend.
- **CSS3**: Estilos personalizados con variables para soporte de Modo Oscuro.
- **Lucide React / SVGs**: Para la iconografía del sistema.

## 📁 Estructura de Carpetas

frontend/
├── src/
│   ├── components/       # Componentes reutilizables de la UI
│   ├── Pages/            # Pantallas principales (Home, Solicitudes, etc.)
│   ├── services/         # Configuración de Axios y llamadas a la API
│   ├── css/              # Hojas de estilo organizadas por módulos
│   ├── App.jsx           # Componente raíz y manejo de rutas
│   └── main.jsx          # Punto de entrada de React
├── .env                  # Variables de entorno (no subir a Git)
└── package.json          # Dependencias y scripts

## ⚙️ Configuración
1. Variables de Entorno
Crea un archivo .env en la raíz de esta carpeta y configura la URL de tu backend:

VITE_API_URL=http://localhost:4000/api

2. Instalación
Instala todas las dependencias necesarias:

npm install

3. Ejecución en Desarrollo
Para levantar el proyecto localmente con recarga en vivo:

npm run dev

## 🎨 Características Especiales
Theme Toggle: Sistema de cambio entre Modo Claro y Modo Oscuro integrado mediante variables CSS (--bg, --text, --border).

Animaciones Fluidas: Uso de transiciones y keyframes para la expansión de tarjetas y cambios de estado.

Responsive Design: Adaptado para ser consultado desde diferentes dispositivos.

## 🛠️ Scripts Disponibles
npm run dev: Inicia el servidor de desarrollo.

npm run build: Genera la versión optimizada para producción en la carpeta dist/.

npm run preview: Permite previsualizar localmente la versión de producción.