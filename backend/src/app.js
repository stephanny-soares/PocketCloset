require('dotenv').config(); // Carga variables de .env
const express = require('express');
const cors = require('cors'); // importar CORS
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware CORS para permitir requests desde el frontend
app.use(cors({
  origin: '*' // 🔹 para desarrollo, luego se puede restringir
}));

// Rutas principales
const registerRoute = require('./routes/register');
const usersRoutes = require('./routes/users');

app.use('/api', registerRoute);
app.use('/api/users', usersRoutes);

// Rutas de prueba (modulares)
const utilsRoutes = require('./routes/utils');
app.use('/', utilsRoutes);

module.exports = app;
