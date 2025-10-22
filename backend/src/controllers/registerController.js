const { crearUsuario, buscarPorEmail } = require('../models/User');
const { validarEmail, validarNombre, validarPassword } = require('../validators/generalValidators');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../logger/logger'); // Nuevo: logger para registrar eventos

const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Validaciones
         if (!validarNombre(nombre) || !validarEmail(email) || !validarPassword(password)) {
            logger.warn({
                event: 'DatosInvalidos',
                message: 'Intento de registro con datos inválidos',
                email,
                correlationId: req.correlationId
            });
            return res.status(400).json({ ok: false, error: 'Datos inválidos' });
        }

        // Comprobar duplicado
        const existente = await buscarPorEmail(email);
        if (existente) {
            logger.warn({
                event: 'EmailDuplicado',
                message: `Email ya registrado: ${email}`,
                correlationId: req.correlationId
            });
            return res.status(409).json({ ok: false, error: 'Email ya registrado' });
        }

        // Crear usuario
        const usuario = await crearUsuario({ nombre, email, password });

        // Registrar en logs
        logger.info({
            event: 'UsuarioCreado',
            userId: usuario.id,
            email: usuario.email,
            message: 'Nuevo usuario creado exitosamente',
            correlationId: req.correlationId
        });

          // Generar JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET || 'secretkey',
            { expiresIn: '1h' }
        );

        return res.status(201).json({ ok: true, usuario, token });
    } catch (error) {
        logger.error({
            event: 'ErrorRegistro',
            message: error.message,
            stack: error.stack,
            correlationId: req.correlationId
        });
        return res.status(500).json({ ok: false, error: 'Error en el servidor' });
    }
};

module.exports = { registrarUsuario };
