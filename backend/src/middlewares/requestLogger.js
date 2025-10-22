const { v4: uuidv4 } = require('uuid');
const logger = require('../logger/logger');

const requestLogger = (req, res, next) => {
  const correlationId = req.headers['x-correlation-id'] || uuidv4();
  req.correlationId = correlationId;

  logger.info({
    event: 'RequestReceived',
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    correlationId
  });

  next();
};

module.exports = requestLogger;
