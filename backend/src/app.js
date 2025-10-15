const express = require('express');
const cors = require('cors'); // importar CORS
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware CORS para permitir requests desde el frontend
app.use(cors({
  origin: '*' // 🔹 para desarrollo, luego se puede restringir
}));

// Ruta decorativa
app.get('/', (req, res) => {
  res.send('Servidor Backend PocketCloset funcionando');
});


// Ruta de prueba /ping
app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

module.exports = app;
