
# Tabla: users
**Estado:** Conceptual  
**Responsable:** Equipo Backend  
**Última actualización:** 16/10/2025  
**Origen del requisito:** Épica 2 – Registro de Usuario  

---

## Descripción
La tabla `users` almacena la información principal de cada usuario registrado en la plataforma.  
Es la base para los procesos de autenticación, autorización y gestión de cuentas.

Cada registro representa un usuario único dentro del sistema, identificado por su `id` y `email`.

---

## Estructura de campos

| Campo          | Tipo (conceptual) | Restricciones    | Descripción                                      | Ejemplo                                                                                          |
|----------------|------------------|------------------|--------------------------------------------------|--------------------------------------------------------------------------------------------------|
| id             | UUID             | PK               | Identificador único del usuario                  | b7f9d2b0-34c1-4dcf-b1f4-930ec88a9f60                                                             |
| nombre         | string (varchar) | NOT NULL         | Nombre completo del usuario                      | María Santos                                                                                     |
| email          | string (varchar) | UNIQUE, NOT NULL | Correo electrónico utilizado para el acceso      | maria@email.com                                                                                  |
| password_hash  | string (varchar) | NOT NULL         | Contraseña cifrada (bcrypt u otro algoritmo seguro) | $2b$10$...                                                                                       |
| avatar_url     | string (varchar) | NULLABLE         | URL de la imagen de perfil del usuario           | https://cdn.pocketcloset.com/avatars/maria.png                                                   |
| idioma         | string (varchar) | DEFAULT 'es'     | Idioma preferido de la interfaz (ISO 639-1)      | es                                                                                               |
| pais           | string (varchar) | NULLABLE         | País de residencia del usuario (ISO 3166-1 alpha-2) | ES                                                                                               |
| activo         | boolean          | DEFAULT true     | Indica si la cuenta está activa                  | true                                                                                             |
| creado_en      | datetime         | DEFAULT now()    | Fecha/hora de creación del registro (UTC)        | 2025-10-16T18:45:00Z                                                                             |
| actualizado_en | datetime         | DEFAULT now()    | Actualizado automáticamente en cada modificación (UTC) | 2025-10-16T18:45:00Z                                                                          |
| ultimo_login   | datetime         | NULLABLE         | Último acceso del usuario (UTC)                  | 2025-10-20T08:30:00Z                                                                             |

---

## Reglas y validaciones

- `email` debe ser único (no se permiten duplicados) y cumplir el formato válido de correo electrónico (RFC 5322).  
- `password_hash` debe generarse con un algoritmo seguro (por ejemplo, **bcrypt**).  
  - No se almacenan contraseñas en texto plano.  
  - La validación se realiza mediante comparación del hash.  
- `nombre` debe contener solo caracteres válidos (mínimo 2, máximo 80).  
- `activo` es `true` por defecto.  
  - Si se establece en `false`, el usuario no podrá autenticarse.  
- `creado_en` se define automáticamente al crear el usuario.  
- `actualizado_en` se actualiza automáticamente en cada modificación.  
- `ultimo_login` se actualiza en cada inicio de sesión exitoso (en formato UTC).  

---

## Relaciones futuras

| Relación | Tipo | Descripción |
|-----------|------|--------------|
| users → roles | 1:N | Un usuario puede tener uno o varios roles o perfiles. |
| users → sessions | 1:N | Un usuario puede mantener varias sesiones activas. |
| users → audit_logs | 1:N | Relación para registrar actividades del usuario. |

---

## Ejemplo de registro (JSON)

```bash
{
  "id": "b7f9d2b0-34c1-4dcf-b1f4-930ec88a9f60",
  "nombre": "María Santos",
  "email": "maria@email.com",
  "password_hash": "$2b$10$hjdsa87d...",
  "avatar_url": "https://cdn.pocketcloset.com/avatars/maria.png",
  "idioma": "es",
  "pais": "ES",
  "activo": true,
  "creado_en": "2025-10-16T18:45:00Z",
  "actualizado_en": "2025-10-16T18:45:00Z",
  "ultimo_login": "2025-10-20T08:30:00Z"
}

```
---

## Buenas prácticas técnicas

- Utilizar UUID v4 para id (evita conflictos en sistemas distribuidos).
- Mantener los timestamps en formato UTC.
- Seguir convención de nombres en snake_case (por ejemplo, ultimo_login).
- Crear un índice único para el campo email.
- Usar algoritmos de cifrado fuerte para password_hash (bcrypt o argon2).
- Incluir auditoría futura para login y actualización de contraseña.

---

## Histórico de Tarefas

| Fecha       | Responsable      | Descripción                                      |
|------------|-----------------|------------------------------------------------|
| 16/10/2025 | Stephanny        | Creación inicial del modelo conceptual         |
| (futuro)   | Equipo Backend   | Adición de relación con roles                  |
| (futuro)   | DBA              | Implementación en la base de datos PostgreSQL |
>>>>>>> docs/regras-e-padroes


Versión y estado
Versión actual: 1.0 (conceptual)

---

## Próximos pasos:

- Revisión con el equipo Backend

- Modelado lógico (tipos y restricciones SQL)

- Creación de la primera migración