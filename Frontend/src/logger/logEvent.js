// ===============================
// logEvent.js — Envío de eventos al backend (PocketCloset Logging Spec)
// ===============================
// - Cumple formato JSON estructurado definido en pocketcloset_logging_spec_v1.md
// - Se usa tanto en LoginScreen como en RegisterScreen
// - No envía datos sensibles (contraseña, token, etc.)
// - Enmascara datos personales (GDPR/LGPD compliant)
// ===============================

import { logger } from './logger';
import { uuidv4 } from './helpers';

// Obtiene URL base de API
const API_BASE = (process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api').replace(/\/+$/, '');
const LOG_ENDPOINT = `${API_BASE}/v1/logs`;

// ===============================
//  Función principal
// ===============================
export const logEvent = async ({
  level = 'info',
  event,
  message,
  userId,
  requestId,
  correlationId,
  extra = {},
}) => {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    event,
    userId: userId ?? null,
    requestId: requestId || uuidv4(),
    correlationId: correlationId || uuidv4(),
    message,
    ...extra, // método, URL, dispositivo, etc.
  };

  // Log local (solo visible en dev)
  logger.debug('[LOG-EVENT]', payload);

  try {
    await fetch(LOG_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Evita romper la app si el envío falla
    logger.warn('⚠️ Error enviando log al backend:', err.message);
  }
};
