
# PocketCloset – CONTROL.md (Logs y Auditoría)

> Fecha de creación: 2025-10-16  
> Última actualización: 2025-10-16  
> Versión: 1.0  
> Responsable: Stephanny Soares  

> Documento oficial para definir la **estrategia de logs y auditoría** del proyecto PocketCloset.  
> Incluye eventos críticos, estructura de logs, accesibilidad y políticas de retención.

---

## 1. Objetivo

Definir las reglas, formatos y procedimientos para **registrar eventos críticos** del sistema y auditar acciones importantes.  
Garantizar que QA y operaciones puedan **monitorizar y revisar eventos** para asegurar la integridad del proyecto.

---

## 2. Eventos críticos a registrar

| Tipo de evento | Descripción | Nivel de log | Observaciones |
|----------------|------------|--------------|---------------|
| Registro de usuario | Éxito/fallo de creación de cuenta | info / error | Incluir user_id si aplica |
| Login / Logout | Éxito/fallo de login | info / warn / error | Incluye user_id y timestamp |
| CRUD de prendas | Creación, actualización, eliminación de prendas | info / warn / error | Registrar usuario y acción |
| Cambios de datos sensibles | Actualización de contraseña, email, roles | warn / error | Registrar usuario y tipo de cambio |
| Operaciones del Planner / SmartPack | Generación de outfits, listas de equipaje | info | Registrar user_id y resultado |
| Errores internos | Excepciones, fallos de sistema | error | Incluir stack trace y endpoint |

---

## 3. Estructura de logs

Formato estándar:

```json
{
  "timestamp": "YYYY-MM-DDTHH:mm:ssZ",
  "nivel": "info|warn|error",
  "evento": "LOGIN_SUCCESS|USER_REGISTERED|PRENDA_CREATED|...",
  "user_id": 123,
  "endpoint": "/api/users/register",
  "mensaje": "Descripción del evento"
}
``` 

| Campo       | Descripción                                    |
|------------|------------------------------------------------|
| timestamp  | Fecha y hora UTC del evento                    |
| nivel      | info, warn, error                               |
| evento     | Nombre estandarizado del evento                |
| user_id    | ID del usuario afectado (si aplica)           |
| endpoint   | URL o módulo afectado                          |
| mensaje    | Descripción clara y legible                    |


## 4. Retención y accesibilidad

- Logs deben almacenarse mínimo **30 días** en entorno de desarrollo/staging  
- Logs críticos en producción deben conservarse **90 días**  
- Acceso: solo roles **Dev, QA, Ops**  
- QA debe poder consultar logs para auditoría y pruebas de regresión  
- Logs opcionales centralizados en herramientas como **ELK o Grafana**  

---

## 5. Auditoría

- QA revisará periódicamente los logs vs. eventos esperados  
- Se documentará cualquier fallo, inconsistencia o error crítico  

**Procedimiento de auditoría:**
1. Exportar logs del periodo correspondiente  
2. Comparar con registros de QA / endpoints testeados  
3. Marcar incidencias en Jira / sistema de seguimiento  
4. Actualizar `CONTROL.md` si se identifican eventos no contemplados  

---

## 6. Actualización y mantenimiento

- Este documento es **vivo**, debe actualizarse cuando:
  - Se agreguen nuevos endpoints o funcionalidades críticas  
  - Cambien reglas de negocio o eventos importantes  
  - Se modifique la estructura de logs o política de retención  

💡 **Nota:**  
Este documento puede ser enlazado en:  
- `DOCUMENTO_MAESTRO.md` → sección **Logs y Auditoría**  
- `docs/qa/checklist_implementacion.md` → sección **Logs y auditoría**
