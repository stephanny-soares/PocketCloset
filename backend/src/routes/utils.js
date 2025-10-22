const express = require('express');
const router = express.Router();

// Ruta decorativa
router.get('/', (req, res) => {
    res.send('Servidor Backend PocketCloset funcionando');
});

// Ruta de prueba /ping
router.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

module.exports = router;
