# Imagen base ligera con Node.js
FROM node:20-alpine

# Crear carpeta de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar Expo CLI y dependencias
RUN npm install -g expo-cli && npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto usado por Metro (Expo web)
EXPOSE 8081

# Comando por defecto: iniciar Expo en modo web
CMD ["npx", "expo", "start", "--web"]
