
Proyecto base del frontend de la aplicación PocketCloset, creado con React Native (Expo) y JavaScript.
Este proyecto define la estructura inicial del frontend, incluye una página Home funcional y está completamente dockerizado para facilitar su ejecución y despliegue.

1 Descripción

Este frontend es la base del proyecto PocketCloset, una aplicación enfocada en la gestión digital de prendas y armarios.
El trabajo consiste en inicializar el entorno frontend con:

Página Home renderizando correctamente.

Estructura de carpetas base (/src, /components, /pages).

Configuración de Docker funcional para levantar el entorno Expo.

2 Estructura del Proyecto
Frontend/
├── app/
│   └── index.js
├── src/
│   ├── components/
│   │   └── Header.js
│   └── pages/
│       └── Home.js
├── .dockerignore
├── .gitignore
├── app.json
├── Dockerfile
├── package.json
├── package-lock.json
├── README.md

3 Tecnologías Utilizadas

React Native + Expo :	Framework y entorno para desarrollo multiplataforma.
JavaScript (ES6) :	Lenguaje principal del proyecto.
Node.js 20 (Alpine) :	Imagen base del contenedor Docker.
Docker :	Para la ejecución y despliegue en contenedores.

4 Instalación Local (sin Docker)

Si deseas ejecutar el proyecto directamente en tu máquina:

Clona el repositorio:

git clone https://github.com/tu-usuario/PocketCloset-Frontend.git
cd PocketCloset-Frontend


Instala dependencias:

npm install


Inicia el proyecto con Expo:

npx expo start --web


Abre el navegador y ve a:
👉 http://localhost:8081

5 Ejecución con Docker

5.1 Crear la imagen Docker

Desde la raíz del proyecto (Frontend/):

docker build -t pocketcloset-frontend .

5.2 Ejecutar el contenedor
docker run -it --rm -p 8081:8081 pocketcloset-frontend

5.3 Abrir la app

Una vez corra el contenedor, Expo mostrará:

Web is waiting on http://localhost:8081


Abre esa URL en tu navegador para ver la pantalla Home de PocketCloset 

6 Dockerfile
. Imagen base ligera con Node.js
FROM node:20-alpine

. Crear carpeta de trabajo
WORKDIR /app

. Copiar dependencias
COPY package*.json ./

. Instalar dependencias y Expo CLI
RUN npm install -g expo-cli && npm install

. Copiar el resto del código fuente
COPY . .

. Exponer el puerto que usa Expo Web
EXPOSE 8081

. Comando por defecto: iniciar Expo en modo web
CMD ["npx", "expo", "start", "--web"]

7 .dockerignore

Evita copiar archivos innecesarios al contenedor:

node_modules
.expo
.git
.vscode
.DS_Store
npm-debug.log

7 Criterios de Finalización

. Proyecto frontend inicializado correctamente
. Página Home creada y renderizando
. Estructura base: /src, /components, /pages
. Dockerfile funcional, con la app corriendo en http://localhost:8081


