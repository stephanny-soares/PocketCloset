# 1. Imagen base con Node.js
FROM node:20-alpine

# 2. Crear carpeta de la app
WORKDIR /usr/src/app

# 3. Copiar package.json y package-lock.json para instalar dependencias primero
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install

# 5. Copiar el resto de la app
COPY . .

# 6. Exponer puerto
EXPOSE 3000

# 7. Comando por defecto para levantar el servidor
CMD ["node", "src/server.js"]
