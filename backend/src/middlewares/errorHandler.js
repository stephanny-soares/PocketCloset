const logger = require('../logger/logger');

const errorHandler = (err, req, res, next) => {
  logger.error({
    event: 'UnhandledError',
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    correlationId: req.correlationId || 'N/A'
  });

  res.status(500).json({ ok: false, error: 'Error interno del servidor' });
};

module.exports = errorHandler;
