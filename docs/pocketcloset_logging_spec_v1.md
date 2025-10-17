# PocketCloset_Logging_Spec_v1.md

## 1. Contexto y Objetivo

**PocketCloset** es un sistema orientado a la organización de armarios, personalización de looks y optimización del uso de prendas.
Dado que el sistema maneja **datos de usuarios, preferencias personales y acciones de compra**, es esencial garantizar **trazabilidad, auditoría y seguridad**.

Este documento define el **estándar oficial de Logging** de PocketCloset, describiendo cómo, cuándo y dónde registrar eventos del sistema, asegurando consistencia y conformidad entre los entornos *development*, *staging* y *production*.

---

## 2. Objetivos del Logging

* Garantizar **trazabilidad completa** de eventos entre sistemas y usuarios.
* Facilitar la **detección, depuración y corrección de errores**.
* Proporcionar base para **auditoría técnica y de seguridad**.
* Evitar pérdida de información crítica sobre el funcionamiento del sistema.
* Apoyar **análisis de desempeño y comportamiento de uso**.

---

## 3. Estructura Estándar de Log

Todos los logs deben seguir el formato JSON estructurado a continuación:

```json
{
  "timestamp": "2025-10-17T14:22:31Z",
  "level": "info",
  "event": "UserCreated",
  "userId": "1234",
  "requestId": "abcd-5678",
  "correlationId": "req-9f3a8c7e-1123",
  "message": "Nuevo usuario creado con éxito"
}
```

### Campos obligatorios

| Campo           | Descripción                                                               |
| --------------- | ------------------------------------------------------------------------- |
| `timestamp`     | Fecha/hora del evento (ISO 8601)                                          |
| `level`         | Nivel de severidad (`error`, `warn`, `info`, `debug`)                     |
| `event`         | Nombre técnico del evento (`UserCreated`, `LoginFailed`, etc.)            |
| `userId`        | Identificador del usuario (cuando aplique)                                |
| `requestId`     | ID único de la solicitud HTTP                                             |
| `correlationId` | ID global para trazabilidad entre servicios (microservicios, colas, etc.) |
| `message`       | Descripción resumida del evento                                           |

---

### 3.1 Convención de Nombres de Eventos

Los eventos deben seguir el estándar **PascalCase**, con verbo + sustantivo:
`UserCreated`, `LoginFailed`, `ImageUploaded`, `LookShared`.
Evitar nombres genéricos o abreviaturas.

---

## 4. Niveles de Log y Cuándo Usar

| Nivel     | Uso típico                                | Ejemplo                                           |
| --------- | ----------------------------------------- | ------------------------------------------------- |
| **error** | Fallos graves, excepciones no manejadas   | Fallo al guardar imagen en el servidor            |
| **warn**  | Situaciones inesperadas, pero no críticas | Intento de login con contraseña incorrecta        |
| **info**  | Eventos normales del sistema              | Nuevo usuario registrado, item agregado al closet |
| **debug** | Detalles técnicos útiles en desarrollo    | Datos devueltos por API externa                   |

---

## 5. Entornos y Política de Logging

| Entorno         | Descripción                    | Niveles Activos                     |
| --------------- | ------------------------------ | ----------------------------------- |
| **Development** | Pruebas locales y debugging    | `debug`, `info`, `warn`, `error`    |
| **Staging**     | Validación antes de producción | `info`, `warn`, `error`             |
| **Production**  | Entorno real de operación      | `info`, `warn`, `error` (sin debug) |

### Política de Retención y Rotación

| Tipo de log                 | Retención | Observación                         |
| --------------------------- | --------- | ----------------------------------- |
| Logs generales (producción) | 90 días   | Logs de uso y operaciones normales  |
| Logs de error               | 180 días  | Guardar para análisis de incidentes |

**Configuraciones adicionales:**

* Tamaño máximo por archivo: `10 MB`
* Máximo de 10 archivos rotativos
* Compresión automática (`zippedArchive: true`)
* Eliminación automática de archivos expirados

---

## 6. Estructura Técnica de Logging

### 6.1 Dependencia principal

Se utiliza la biblioteca **Winston** para la gestión centralizada de logs.

```bash
npm install winston
```

### 6.2 Configuración de Winston (`logger.js`)

```js
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 10 * 1024 * 1024,
      maxFiles: 10,
      zippedArchive: true
    }),
    new winston.transports.File({
      filename: 'logs/app.log',
      level: 'info',
      maxsize: 10 * 1024 * 1024,
      maxFiles: 10,
      zippedArchive: true
    })
  ]
});

export default logger;
```

---

## 7. Middlewares y Handlers

### 7.1 Middleware de Logs (`requestLogger.js`)

```js
import { v4 as uuidv4 } from 'uuid';
import logger from '../logger/logger.js';

export const requestLogger = (req, res, next) => {
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
```

---

### 7.2 Middleware de Errores (`errorHandler.js`)

```js
import logger from '../logger/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error({
    event: 'UnhandledError',
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    correlationId: req.correlationId
  });
  res.status(500).json({ message: 'Error interno del servidor' });
};
```

---

### 7.3 Logging de Procesos Asíncronos e Integraciones

```js
logger.info({
  event: 'ImageSyncStarted',
  source: 'AWS_S3',
  correlationId: 'job-12345',
  message: 'Sincronización de imágenes iniciada'
});
```

---

## 8. Estructura de Carpetas

```
/src
 ├── /logger
 │   └── logger.js
 ├── /middleware
 │   ├── requestLogger.js
 │   └── errorHandler.js
 ├── server.js
 └── ...
/logs
 ├── app.log
 └── error.log
/docs
 └── pocketcloset_logging_spec_v1.md
```

---

## 9. Responsabilidades

| Rol                       | Responsable | Actividades                                                                  |
| ------------------------- | ----------- | ---------------------------------------------------------------------------- |
| **Product Owner Técnico** | Stephanny   | Definir estándar de logs, revisar conformidad técnica y garantizar seguridad |
| **Backend Developer**     | Laura       | Implementar logger, middlewares e integración en rutas                       |
| **Frontend Developer**    | Irene       | Enviar logs de eventos de interfaz (login, upload, favoritos)                |
| **QA / Testing**          |             | Validar formato, contenido y política de retención                           |

---

### 9.1 Validación de Logging (QA)

El QA debe validar:

* Presencia de los campos obligatorios (`timestamp`, `level`, `event`, etc.).
* Generación de logs para eventos clave.
* Que los logs **no contengan datos sensibles**.
* Rotación y compresión configuradas correctamente.

---

## 10. Seguridad y Buenas Prácticas

* **Nunca registrar datos sensibles** (contraseñas, tokens, correos electrónicos, archivos binarios).
* **Enmascarar o anonimizar** datos personales cuando sea necesario.
* **Encriptar logs** en reposo (AES-256) y transferir vía **HTTPS/TLS**.
* **Restringir permisos de acceso** a los archivos (`chmod 640`).
* **Separar logs por entorno** (`/logs/dev`, `/logs/staging`, `/logs/prod`).
* **Auditoría trimestral de logs** para revisión de conformidad.

---

### 10.1 Sanitización de Datos

Antes de guardar logs:

* Eliminar correos, teléfonos, tokens, números de tarjeta.
* Anonimizar payloads cuando aplique.
* Aplicar filtros automáticos en el middleware.

---

### 10.2 Conformidad con GDPR / LGPD

PocketCloset adopta prácticas de conformidad con GDPR/LGPD:

* Recoger y almacenar solo lo necesario para la operación técnica.
* Permitir eliminación de logs relacionados con un usuario bajo solicitud formal.
* Garantizar anonimización en logs públicos.

---

## 11. Auditoría y Monitoreo

Los logs deben revisarse periódicamente para:

* Identificar patrones de error recurrentes.
* Monitorear desempeño y seguridad.
* Detectar actividades sospechosas.

### 11.1 Alertas Automáticas

Errores críticos (`level: error`) deben activar alertas automáticas (Slack, correo o Datadog).
El alerta debe incluir:

* `event`
* `requestId`
* `userId`
* `correlationId`
* Stack resumido

### 11.2 Integraciones Futuras

Se planea integración con:

* **Datadog**, **Sentry**, **Graylog**, **Elastic Stack (ELK)** o **AWS CloudWatch** para centralización y visualización en tiempo real.

---

## 12. Historial de Versiones

| Versión | Fecha      | Autor            | Descripción                                                         |
| ------- | ---------- | ---------------- | ------------------------------------------------------------------- |
| v1.0    | 17/10/2025 | Stephanny Soares | Creación inicial de la especificación de Logging.                   |
|         |            |                  |                                                                     |

---

## Conclusión

Este documento formaliza el estándar de Logging de **PocketCloset**, garantizando uniformidad, seguridad y trazabilidad entre entornos.
Cualquier cambio futuro o nuevo evento deberá generar una nueva versión del documento (`_v1.2`, `_v2`, ...).

---

**Documento Oficial**
`PocketCloset_Logging_Spec_v1.md`
Elaborado por: *Stephanny Soares*
Rol: *Product Owner Técnico / Gestora de Documentación*
Fecha: *17 de octubre de 2025*
