const conexion = require('../config/db');

// Obtener todos los usuarios
const obtenerUsuarios = (req, res) => {
  const sql = 'SELECT id, nombre, email, created_at AS fecha_registro FROM users';
  conexion.query(sql, (err, resultado) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({ ok: false, error: 'Error en el servidor' });
    }
    res.status(201).json({ ok: true, usuarios: resultado });
  });
};


module.exports = {
  obtenerUsuarios,
};
