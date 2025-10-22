const express = require('express');
const router = express.Router();
const { obtenerUsuarios } = require('../controllers/userController');

// GET /api/users
router.get('/', obtenerUsuarios);

module.exports = router;
