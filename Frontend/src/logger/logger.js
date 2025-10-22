// ===============================
// logger.js — Configura niveles y formato del logger local
// ===============================
// Este archivo gestiona los niveles de log que se activan
// según el entorno (development, staging, production)
// y define una estructura base para cada evento enviado.

import { getEnv } from './helpers';

const ENV = getEnv();

// Define niveles activos por entorno
const LEVELS = {
  development: ['debug', 'info', 'warn', 'error'],
  staging: ['info', 'warn', 'error'],
  production: ['info', 'warn', 'error'],
};

// =========================================
//  Función principal del logger local
// =========================================
export const logger = {
  log(level, ...args) {
    if (LEVELS[ENV]?.includes(level)) {
      const ts = new Date().toISOString();
      // eslint-disable-next-line no-console
      console[level === 'debug' ? 'log' : level](`[${ts}] [${level.toUpperCase()}]`, ...args);
    }
  },
  info: (...args) => logger.log('info', ...args),
  warn: (...args) => logger.log('warn', ...args),
  error: (...args) => logger.log('error', ...args),
  debug: (...args) => logger.log('debug', ...args),
};
