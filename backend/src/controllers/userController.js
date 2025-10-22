const conexion = require('../config/db');
const { escapeHtml } = require('../validators/generalValidators');

// Obtener todos los usuarios
const obtenerUsuarios = (req, res) => {
  const sql = 'SELECT id, nombre, email, created_at AS fecha_registro FROM users';
  conexion.query(sql, (err, resultado) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({ ok: false, error: 'Error en el servidor' });
    }

    // Sanitizar datos antes de enviarlos
    const usuariosSanitizados = resultado.map(u => ({
      id: u.id,
      nombre: escapeHtml(u.nombre),
      email: escapeHtml(u.email),
      fecha_registro: u.fecha_registro
    }));

    res.status(201).json({ ok: true, usuarios: usuariosSanitizados });
  });
};


module.exports = {
  obtenerUsuarios,
};
