const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta decorativa
app.get('/', (req, res) => {
  res.send('Servidor Backend PocketCloset funcionando');
});


// Ruta de prueba /ping
app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

module.exports = app;
