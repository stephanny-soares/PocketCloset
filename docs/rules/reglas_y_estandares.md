
# Reglas y Patrones – Proyecto PocketCloset 

**Versión:** 1.0  
**Fecha de creación:** 16/10/2025  
**Autor / Responsable:** Stephanny Soares  

## 1. Objetivo
Este documento es la **referencia oficial del equipo** para el desarrollo de la aplicación PocketCloset.  
Define **validaciones de campos, mensajes de error/éxito, buenas prácticas de UI/UX, observaciones generales y logs/auditoría**, garantizando consistencia entre **frontend, backend y QA**.

---

## 2. Estructura de campos del formulario de registro

| Campo | Obligatorio | Reglas de validación | Ejemplo válido | Ejemplo inválido | Observaciones |
|-------|------------|------------------|---------------|----------------|------------|
| Nombre | ✅ | Mínimo 2 caracteres, permite letras y espacios | María Santos | M | Debe permitir acentos |
| Email | ✅ | Formato válido (`usuario@dominio.com`), unicidad en el backend | maria@email.com | mariaemail.com | Backend debe validar duplicidad |
| Contraseña | ✅ | Mínimo 8 caracteres, al menos 1 número y 1 símbolo | Abc123!@# | 12345678 | Backend debe almacenar cifrado (bcrypt o Argon2) |
| Confirmación de contraseña | ✅ | Debe coincidir con la contraseña | Abc123!@# | Abc123! | Solo validación front-end |
| Aceptar Términos y Políticas | ✅ | Checkbox marcado | ✔ | ❌ | Impide envío si no está marcado |

> **Observación:** Para futuros campos (teléfono, fecha de nacimiento, dirección) se seguirá la misma estructura de validación, ejemplos y observaciones.

---

## 3. Mensajes de error y éxito

### 3.1 Backend (estándar)
```json
{ "success": false, "message": "EMAIL_ALREADY_REGISTERED" }
{ "success": true, "message": "USER_REGISTERED_SUCCESS" }
```
- Claves estandarizadas para internacionalización (ej: EMAIL_ALREADY_REGISTERED, PASSWORD_TOO_WEAK).

- Mensajes del backend no exponen información sensible.

### 3.2 Frontend
El frontend traduce los códigos del backend a mensajes amigables y claros:

| Código                  | Mensaje mostrado                  |
|-------------------------|----------------------------------|
| EMAIL_ALREADY_REGISTERED | "El email ya está registrado"    |
| PASSWORD_TOO_WEAK        | "La contraseña es demasiado débil" |
| USER_REGISTERED_SUCCESS  | "Usuario registrado con éxito"   |


- Se recomienda mostrar los mensajes cerca del campo correspondiente y/o mediante toast/modal para consistencia visual.

---

## 4. Buenas prácticas de UI/UX
| Funcionalidad                   | Recomendación                                       |
|---------------------------------|----------------------------------------------------|
| Loader durante envío            | Mostrar hasta recibir respuesta del backend       |
| Mostrar/ocultar contraseña      | Botón para alternar visibilidad de la contraseña  |
| Indicador de fuerza de la contraseña | Opcional, recomendado                        |
| Feedback de errores             | Mensaje claro cerca del campo o toast/modal       |
| Feedback de éxito               | Mensaje destacado o redirección                   |

---

## 5. Seguridad y validaciones backend
- Todas las validaciones front-end deben ser reforzadas en el backend.

- Contraseñas deben ser cifradas con bcrypt o Argon2.

- Emails deben ser únicos y validados nuevamente en backend.

- Nombres de endpoints, rutas y parámetros deben ser consistentes entre frontend y backend.

- Logs/auditoría: eventos críticos como registro, login y cambios sensibles deben registrarse.

### 5.1 Ejemplo de log/auditoría - JSON
```json
{
  "timestamp": "2025-10-16T14:12:00Z",
  "usuario": "maria@email.com",
  "evento": "USER_REGISTRATION",
  "resultado": "SUCCESS",
  "ip": "192.168.0.1"
}
```
---

## 6. Endpoints involucrados (registro de usuario)
| Ruta           | Método | Campos esperados                               | Respuesta esperada                     |
|----------------|--------|-----------------------------------------------|---------------------------------------|
| /api/register  | POST   | nombre, email, password, confirmPassword, acceptTerms | JSON con success y message             |

- Para futuros endpoints, seguir la misma estructura y nomenclatura.
 ---

## 7. Posibles errores críticos del backend

- **Fallo de base de datos (DB_ERROR)**  
  - Ocurre cuando el backend no puede acceder a la base de datos.  
  - Respuesta: `{ "success": false, "message": "DB_ERROR" }`  
  - Acciones: mostrar mensaje genérico al usuario y registrar log.

- **Timeout de conexión (TIMEOUT_ERROR)**  
  - Ocurre cuando una solicitud tarda demasiado en procesarse.  
  - Respuesta: `{ "success": false, "message": "TIMEOUT_ERROR" }`  
  - Acciones: reintentar la operación según política, mostrar feedback al usuario.

- **Email externo inválido (EMAIL_INVALID)**  
  - Ocurre cuando se intenta enviar confirmación o notificación y el email no es válido.  
  - Respuesta: `{ "success": false, "message": "EMAIL_INVALID" }`  
  - Acciones: registrar log, notificar al usuario que revise su email.

- **Error de duplicidad no contemplada (DUPLICATE_RECORD)**  
  - Puede ocurrir por condiciones de carrera u otras inconsistencias.  
  - Respuesta: `{ "success": false, "message": "DUPLICATE_RECORD" }`  
  - Acciones: backend debe manejar el conflicto, frontend mostrar mensaje amigable.

- **Error de validación inesperado (VALIDATION_ERROR)**  
  - Para cualquier dato enviado que no cumpla reglas internas del backend no previstas en frontend.  
  - Respuesta: `{ "success": false, "message": "VALIDATION_ERROR" }`  
  - Acciones: registrar log, revisar reglas y notificar al equipo si necesario.

## 8. Checklist rápido para QA y devs

- Validar nombre (mínimo 2 caracteres)

- Validar email (formato y unicidad)

- Validar contraseña (mínimo 8 caracteres, número y símbolo)

- Confirmar contraseña coincide con la original

- Checkbox de términos marcado antes del envío

- Mensajes de error y éxito mostrados correctamente

- Loader mostrado durante envío

- Funcionalidad de mostrar/ocultar contraseña implementada

- Indicador de fuerza de contraseña (opcional)

- Backend almacena contraseña cifrada

- Campos adicionales documentados antes de implementación

- Logs/auditoría activados para eventos críticos


## Este documento sirve como referencia única y oficial para el equipo de desarrollo.