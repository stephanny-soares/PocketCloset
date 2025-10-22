// Valida formato de email
const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Valida longitud mínima de nombre y contraseña
const validarNombre = (nombre) => nombre && nombre.length >= 2 && nombre.length <= 80;
const validarPassword = (password) => password && password.length >= 6;

module.exports = { validarEmail, validarNombre, validarPassword };
