const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Crear carpeta logs si no existe
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Formato JSON con timestamp
const formato = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

// Configuración de niveles y archivos
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: formato,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 10 * 1024 * 1024,
      maxFiles: 10,
      zippedArchive: true
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'app.log'),
      level: 'info',
      maxsize: 10 * 1024 * 1024,
      maxFiles: 10,
      zippedArchive: true
    })
  ]
});

module.exports = logger;
