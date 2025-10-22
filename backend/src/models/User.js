const conexion = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

// Función para crear un nuevo usuario
const crearUsuario = async ({ nombre, email, password }) => {
    // Generar UUID
    const id = uuidv4();
    // Hashear la contraseña
    const password_hash = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO users (id, nombre, email, password_hash) VALUES (?, ?, ?, ?)`;
        conexion.query(sql, [id, nombre, email, password_hash], (err, resultado) => {
            if (err) return reject(err);
            resolve({ id, nombre, email });
        });
    });
};

// Función para buscar usuario por email (para validar duplicados)
const buscarPorEmail = async (email) => {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM users WHERE email = ?`, [email], (err, resultado) => {
            if (err) return reject(err);
            resolve(resultado[0] || null);
        });
    });
};

module.exports = { crearUsuario, buscarPorEmail };
