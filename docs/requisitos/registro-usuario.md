
# Documento Funcional – Registro de Usuario

**Módulo:** Autenticación  
**Funcionalidad:** Registro de nuevo usuario  
**Versión:** 1.0  
**Responsables:** QA / Backend  
**Fecha:** 20/10/25  

---

## Historia de Usuario

> **Como** nuevo usuario del sistema  
> **quiero** crear una cuenta con mi correo electrónico y una contraseña segura  
> **para** poder acceder al PocketCloset, guardar mis prendas y recibir recomendaciones personalizadas.

---

## Criterios de Aceptación

1. El sistema debe permitir el registro con los siguientes campos obligatorios:
   - Nombre de usuario  
   - Correo electrónico  
   - Contraseña  

2. El correo electrónico debe ser **único** (no puede estar registrado previamente).  
3. La contraseña debe cumplir con los requisitos mínimos:
   - Mínimo **8 caracteres**  
   - Al menos **1 número**  
   - Al menos **1 letra mayúscula**  
   - Al menos **1 carácter especial**  

4. Si algún campo obligatorio está vacío o inválido, debe mostrarse un mensaje de error claro.  
5. Si el registro es exitoso:
   - El sistema guarda los datos en la base de datos.  
   - La contraseña se almacena **encriptada**.  
   - Se muestra un mensaje de confirmación (“Registro exitoso”).  
   - El usuario puede ser redirigido a la pantalla de inicio de sesión o directamente a la app (según diseño).  

6. Todos los mensajes deben mostrarse en el idioma configurado (por defecto: español).  
7. La API debe devolver los códigos HTTP correctos:
   - **201 Created** → Registro exitoso  
   - **400 Bad Request** → Campos inválidos o incompletos  
   - **409 Conflict** → Correo electrónico ya registrado  

---

## Requisitos Funcionales

### Endpoint principal

```bash

POST /api/v1/users/register

```

### Cuerpo de la solicitud

```json
{
  "name": "Maria Test",
  "email": "maria@test.com",
  "password": "Password@123"
}
```

### Respuestas esperadas

**Registro exitoso**

```json
{
  "message": "Registro exitoso",
  "userId": "123abc",
  "email": "maria@test.com"
}
```

**Error de validación**

```json
{
  "error": "Correo electrónico inválido o contraseña débil"
}
```

**Email duplicado**

```json
{
  "error": "El correo electrónico ya está registrado"
}
```

---

## Requisitos No Funcionales

| Categoría                       | Descripción                                                          |
| ------------------------------- | -------------------------------------------------------------------- |
| **Seguridad**                   | Las contraseñas deben almacenarse con hash (bcrypt o similar).       |
| **Conexión**                    | Las solicitudes deben realizarse vía HTTPS.                          |
| **Tiempo de respuesta**         | Menos de 2 segundos por solicitud.                                   |
| **Disponibilidad**              | 99% en entorno productivo.                                           |
| **Compatibilidad**              | Compatible con navegadores modernos (Chrome, Safari, Firefox, Edge). |
| **Internacionalización (i18n)** | Textos y mensajes en español por defecto.                            |

---

## Flujos Principales

### Flujo Exitoso

1. El usuario completa todos los campos.
2. El sistema valida los datos.
3. El backend crea el nuevo usuario.
4. Se muestra mensaje de éxito y redirección.

### Flujo con Error

1. El usuario deja campos vacíos o introduce datos inválidos.
2. El sistema muestra errores de validación en pantalla.

### Flujo Email Duplicado

1. El usuario intenta registrar un email ya existente.
2. El sistema devuelve error 409 “Correo electrónico ya registrado”.

---

## Validaciones de Campo

| Campo      | Validación                    | Mensaje de error                                                                                  |
| ---------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| Nombre     | No vacío                      | “El nombre es obligatorio”                                                                        |
| Email      | Formato válido y único        | “Correo electrónico inválido” / “Ya existe una cuenta con este correo”                            |
| Contraseña | Longitud y complejidad mínima | “La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial” |

---

## Notas Técnicas

* Los campos deben enviarse en formato JSON.
* En caso de error de servidor, devolver **500 Internal Server Error**.
* Implementar logs para registro de errores.
* Se recomienda integrar protección contra ataques de tipo **SQL Injection** y **XSS**.

---

## Criterios de QA

* [ ] Validar cada criterio de aceptación.
* [ ] Probar flujos positivos y negativos.
* [ ] Verificar almacenamiento correcto en base de datos.
* [ ] Comprobar que las contraseñas no se guardan en texto plano.
* [ ] Confirmar mensajes correctos según idioma y caso.

---

**Fin del documento**


