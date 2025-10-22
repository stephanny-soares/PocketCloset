// Caracteres especiales para prevenir XSS
const escapeHtml = (str) => {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};


// Valida formato de email
const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? escapeHtml(email) : false;
};

// Valida longitud mínima de nombre y contraseña
const validarNombre = (nombre) => {
    if (nombre && nombre.length >= 2 && nombre.length <= 80) {
        return escapeHtml(nombre);
    }
    return false;
};

const validarPassword = (password) => password && password.length >= 6;

module.exports = { validarEmail, validarNombre, validarPassword, escapeHtml };
