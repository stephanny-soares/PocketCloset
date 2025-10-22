const express = require('express');
const router = express.Router();
const { registrarUsuario } = require('../controllers/registerController');

router.post('/register', registrarUsuario);

module.exports = router;
