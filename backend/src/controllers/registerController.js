const { crearUsuario, buscarPorEmail } = require('../models/User');
const { validarEmail, validarNombre, validarPassword } = require('../validators/generalValidators');

const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Validaciones
        if (!validarNombre(nombre) || !validarEmail(email) || !validarPassword(password)) {
            return res.status(400).json({ ok: false, error: 'Datos inválidos' });
        }

        // Comprobar duplicado
        const existente = await buscarPorEmail(email);
        if (existente) {
            return res.status(409).json({ ok: false, error: 'Email ya registrado' });
        }

        // Crear usuario
        const usuario = await crearUsuario({ nombre, email, password });

        return res.status(201).json({ ok: true, usuario });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, error: 'Error en el servidor' });
    }
};

module.exports = { registrarUsuario };
