
# Ambientes de Desarrollo - PocketCloset

Este documento describe los **entornos de desarrollo** del proyecto **PocketCloset**, incluyendo frontend, backend y base de datos.  
Permite a cualquier desarrollador configurar y ejecutar el proyecto de manera consistente en su máquina local, además de planificar staging y producción.

---

## 1️⃣ Entornos

| Ambiente      | Significado                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------- |
| **Dev Local** | Ambiente de desarrollo en la computadora del desarrollador. Aquí se desarrollan y prueban todos los cambios antes de subirlos al repositorio. |
| **Staging**   | Ambiente de prueba en servidor que replica producción. Usado para validar antes del deploy final.   |
| **Producción**| Ambiente público donde los usuarios finales usan la aplicación. Solo versiones estables entran aquí. |

---

## 2️⃣ Dev Local

### 2.1 Frontend

| Ambiente  | Tipo  | URL / Local           | Responsable | Estado | Observaciones                  |
| --------- | ----- | ------------------- | ----------- | ------ | ------------------------------ |
| Dev Local | Local | http://localhost:8081 | Stephanny   | ✅ Ok  | Expo Web corriendo vía Docker  |

### 2.2 Backend

| Ambiente  | Tipo  | URL / Local           | Responsable | Estado | Observaciones                       |
| --------- | ----- | ------------------- | ----------- | ------ | ----------------------------------- |
| Dev Local | Local | http://localhost:3000 | Stephanny   | ✅ Ok  | Node.js vía Docker, conectado a MySQL |

### 2.3 Base de Datos

| Ambiente  | Tipo  | Puerto / URL | Observaciones                        |
| --------- | ----- | ------------ | ----------------------------------- |
| Dev Local | Local | 3306         | MySQL vía Docker, usado por el backend |

---

## 3️⃣ Staging y Producción (pendientes)

| Ambiente    | URL       | Responsable        | Estado       | Observaciones                         |
| ----------- | -------- | ----------------- | ------------ | --------------------------------------- |
| Staging     | —        | Irene / Laura     |  En progreso | Configuración del servidor en proceso  |
| Producción  | —        | —                 |  En progreso | Deploy futuro en servidor público      |

---

## 4️⃣ Pasos para iniciar en Dev Local

Antes de empezar, asegúrese de tener instalados **Docker**, **Docker Compose** y **Node.js**.

```bash
# Clonar el repositorio
git clone git@github.com:stephanny-soares/PocketCloset.git
cd PocketCloset

# Subir contenedores vía Docker
docker-compose up --build

# Frontend: http://localhost:8081
# Backend: http://localhost:3000

# Testar backend
curl http://localhost:3000
# Respuesta esperada: "Servidor Backend PocketCloset funcionando"
```

---

## 5️⃣ Problemas comunes y recomendaciones

| Problema                     | Solución / Observaciones                                      |
| ----------------------------- | ------------------------------------------------------------- |
| Puerto ocupado                | Cerrar la aplicación que usa el puerto o cambiar el puerto en docker-compose |
| Expo no abre en navegador     | Usar `--host lan` en el Dockerfile del frontend              |
| Contenedores no se levantan  | Rebuild: `docker-compose build` y luego `docker-compose up`  |

---

## 6️⃣ Información adicional

| Servicio       | Detalle                                  |
| -------------- | --------------------------------------- |
| Base de datos  | MySQL 8 (contenedor Docker)             |
| Backend        | Node.js + Express (puerto 3000)         |
| Frontend       | React / Expo Web (puerto 8081)          |
| Herramientas   | Docker, Docker Compose, Node 20-alpine  |
| Repo principal | [GitHub - PocketCloset](https://github.com/stephanny-soares) |

---

## 7️⃣ Mantenimiento y Actualización

| Acción                         | Frecuencia                | Responsable  | Descripción / Observaciones                                         |
| ------------------------------- | ------------------------ | ------------ | ------------------------------------------------------------------- |
| Revisión de puertos / URLs      | Cada 2-4 semanas o fin de sprint | Stephanny    | Verificar si hay cambios en la configuración de frontend, backend o base de datos |
| Actualización de estado         | Cada cambio relevante    | Stephanny    | Marcar ✅ Ok o 🚧 Pendiente según el progreso de los entornos        |
| Comunicación de cambios al equipo | Cada actualización       | Stephanny    | Informar vía commit, PR o mensaje al equipo sobre modificaciones     |
| Versionamiento del documento    | Cada cambio              | Stephanny    | Crear branch `doc/ambientes`, commit y pull request para mantener historial |

---

## Resumen práctico

- Archivo: `/docs/Ambientes_de_Desarrollo.md`  
- Link en README: [README.md](https://github.com/stephanny-soares/PocketCloset/blob/main/README.md)  
- Última actualización: 15/10/2025  
- Autor: Stephanny Soares

---

## Documentación Técnica

- [🌍 Ambientes de Desarrollo](./docs/Ambientes_de_Desarrollo.md)
