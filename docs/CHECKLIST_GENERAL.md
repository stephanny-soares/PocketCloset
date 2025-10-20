
# ✅ CHECKLIST DEL PROYECTO PocketCloset

PocketCloset es una aplicación móvil inteligente basada en IA para la gestión de armario y recomendación de ropa.  
Este checklist garantiza la **calidad, seguridad y estabilidad funcional** del sistema antes de cada entrega, commit o release.

---

## 🧩 ESTRUCTURA Y ORGANIZACIÓN
- [✅] Repositorio organizado por módulos (`frontend`, `backend`, `ia`, `docs`).
- [✅] Convención de nombres consistente (carpetas, archivos y componentes).
- [✅] `README.md` completo y actualizado.
- [✅] `.gitignore` configurado correctamente.
- [ ] Licencia (`LICENSE`) revisada.
- [✅] Ambiente de desarrollo documentado y replicable.
- [✅] Scripts de inicialización (`start`, `dev`, `build`) probados y funcionando.
- [✅] Estándar de commits definido (`Conventional Commits` o similar).

---

## ⚙️ BACKEND
- [ ] Base de datos configurada y probada.
- [✅] Variables de entorno en `.env.example` revisadas.
- [ ] Logs configurados (`INFO`, `ERROR`, `DEBUG`).
- [ ] Middleware de autenticación funcional y probado.
- [ ] Rutas y controllers documentados y validados.
- [ ] Pruebas básicas de API ejecutadas con éxito.
- [ ] Servicios externos (cloud, storage, APIs) probados y autenticados.
- [ ] Versionamiento de API activo (ej: `/api/v1`).
- [ ] Endpoint de health check configurado (`/health` o `/status`).

---

## 🗃️ BASE DE DATOS Y MIGRACIONES
- [ ] Todos los cambios de esquema tienen migrations documentadas.
- [ ] Scripts de seed y rollback probados.
- [ ] Backups automáticos configurados y verificados.
- [ ] Integridad y relaciones de datos validadas tras actualizaciones.
- [ ] Ambiente de staging refleja el esquema de producción.
- [ ] Índices y constraints revisados para rendimiento.

---

## 🔗 INTEGRACIÓN ENTRE MÓDULOS
- [ ] Backend se comunica correctamente con el módulo de IA (payloads y endpoints probados).
- [ ] La app consume datos solo a través del backend (nunca directamente de la IA).
- [ ] Manejo de errores y timeouts implementado en todas las capas.
- [ ] Logs de integración revisados.
- [ ] Versiones de API entre backend ↔ IA ↔ app compatibles.

---

## 🔐 SEGURIDAD Y SESIONES
- [ ] Tokens JWT con expiración y renovación mediante refresh token.
- [ ] Logout limpia tokens localmente y en el servidor.
- [ ] Middleware de autenticación protege rutas privadas.
- [ ] Contraseñas y datos sensibles encriptados (bcrypt, AES, etc.).
- [ ] Dependencias auditadas (`npm audit` / `yarn audit`).
- [ ] Protección contra ataques comunes (XSS, CSRF, SQL Injection, brute force).
- [ ] HTTPS habilitado en staging y producción.
- [ ] Política de CORS configurada correctamente.

---

## 🧩 VALIDACIÓN DE DATOS
- [ ] Inputs validados en backend y frontend.
- [ ] Subida de imágenes limitada en tamaño y formato (solo `.jpg` / `.png`).
- [ ] Campos obligatorios verificados.
- [ ] IA rechaza solicitudes incompletas o con datos inválidos.
- [ ] Mensajes de error estandarizados y claros para el usuario.
- [ ] Sanitización de datos de entrada (para prevenir inyecciones y errores de formato).

---

## 🧠 IA Y MACHINE LEARNING
- [ ] Versión del modelo registrada (commit, fecha, autor).
- [ ] Dataset documentado y almacenado de forma segura.
- [ ] Pruebas de consistencia realizadas (misma entrada → mismo resultado).
- [ ] Mecanismo de fallback activo si el modelo falla (respuesta por defecto o cache).
- [ ] Logs de performance y errores de la IA monitorizados.
- [ ] Latencia de inferencia dentro de límites aceptables.
- [ ] Modelo entrenado solo con datos éticos y consentidos.
- [ ] Logs de inferencia incluyen métricas de precisión y tiempo medio de respuesta.

---

## 🧾 AUDITORÍA Y LOGGING
- [ ] Logs de uso y fallos registrados con `timestamp` y `user_id`.
- [ ] Errores críticos notificados automáticamente (Sentry, LogRocket, etc.).
- [ ] Logs de IA, backend y app separados por módulo.
- [ ] Historial de acciones accesible en modo admin.
- [ ] Ningún dato sensible registrado en logs.
- [ ] Rutinas de rotación y limpieza de logs configuradas.

---

## ☁️ ALMACENAMIENTO E INFRAESTRUCTURA
- [ ] Almacenamiento de imágenes y datos configurado (S3, Cloud Storage, etc.).
- [ ] Políticas de acceso y permisos revisadas.
- [ ] Sistema de cache (Redis, etc.) activo y probado.
- [ ] Monitoreo de consumo de recursos (CPU, RAM, storage).
- [ ] Alertas automáticas configuradas (uptime, fallos, performance).
- [ ] CDN configurada para imágenes y archivos estáticos (cuando aplique).

---

## 📶 SINCRONIZACIÓN Y OFFLINE
- [ ] App guarda datos locales para uso offline (cache local).
- [ ] Sincronización probada tras reconexión.
- [ ] Actualizaciones en segundo plano revisadas.
- [ ] Datos de cache eliminados correctamente tras logout.
- [ ] Estrategia de versionamiento y migración de datos offline implementada.

---

## 🖥️ FRONTEND Y UX

### Frontend técnico
- [✅] Estructura de carpetas y archivos consistente (`components`, `pages`, `assets`, etc.).
- [ ] Componentes reutilizables bien documentados y probados.
- [ ] Validación de inputs y formularios implementada.
- [ ] Manejo de estados y props revisado y consistente.
- [ ] Conexión con el backend correctamente configurada y testeada.
- [✅] Scripts de build y start funcionando (`npm start`, `npm run build`).
- [ ] Dependencias actualizadas y auditadas (`npm audit`).
- [ ] Manejo de errores y mensajes al usuario implementados.

### UX y accesibilidad
- [ ] Pruebas con lector de pantalla y contraste de colores realizadas.
- [ ] Labels y textos revisados.
- [ ] Feedback visual y loading states en todos los flujos.
- [ ] Diseño responsivo y adaptativo en diferentes dispositivos.
- [ ] Flujos principales (login, outfits, IA) probados de punta a punta.
- [ ] Modo oscuro / claro funcional (si aplica).

---

## 🔍 QA Y TESTS
- [ ] Tests unitarios ejecutados sin fallos.
- [ ] Tests automatizados E2E para flujos críticos.
- [ ] Cobertura mínima de tests alcanzada.
- [ ] Errores y warnings corregidos antes del commit.
- [ ] Tests manuales de regresión realizados.
- [ ] Pipelines de CI/CD ejecutan tests automáticamente antes del deploy.
- [ ] Tests básicos de carga y estrés completados.

---

## 🧾 DOCUMENTACIÓN
- [ ] `CHANGELOG.md` actualizado.
- [✅] `CHECKLIST.md` revisado y seguido.
- [ ] Documentación de endpoints (Swagger / Postman) completa.
- [ ] Instrucciones de instalación, ejecución y contribución revisadas.
- [ ] Versiones y releases descritas en `/docs`.
- [ ] Guía de rollback y recuperación de fallos documentada.

---

## 🚀 DEPLOY Y CONTROL DE VERSIONES
- [ ] Branch `main` protegida.
- [ ] Pull requests revisados y aprobados antes del merge.
- [ ] Tags de versión aplicadas (`v1.0.0`, `v1.1.0`, etc.).
- [ ] Deploy automatizado validado (CI/CD).
- [ ] Ambiente de staging probado antes del deploy.
- [ ] Rollback probado y documentado.
- [ ] Variables de entorno separadas por ambiente (`.env.dev`, `.env.prod`, etc.).
- [ ] Deploy automatizado incluye rollback automático en caso de fallo.

---

## 🔒 CONFORMIDAD Y PRIVACIDAD
- [ ] Política de privacidad actualizada y accesible en la app.
- [ ] Datos de usuarios tratados según LGPD/GDPR.
- [ ] Consentimiento explícito para la recopilación y uso de datos.
- [ ] Solicitudes de eliminación y exportación de datos funcionales.
- [ ] Logs y backups cumplen con períodos de retención definidos.

---

📅 **Última revisión:** 20/10/2025   
👤 **Responsable:** Stephanny Soares
🔄 **Versión del checklist:** 1.0 