# PocketCloset – Documento Maestro del Proyecto (Guía Central)

## 1. Introducción / Objetivo

**Descripción del Proyecto:**  
PocketCloset es una aplicación móvil inteligente basada en Inteligencia Artificial (IA) que funciona como asistente personal de estilo y organización de ropa. Permite gestionar el armario, planificar outfits y preparar prendas para diferentes actividades, adaptándose al clima y ocasión.

**Objetivos del Proyecto:**  
- Implementar un asistente inteligente de estilo personal que aprenda de las preferencias del usuario.  
- Digitalizar el armario físico mediante registro de prendas con fotos.  
- Sugerir outfits inteligentes según momento y clima.  
- Incluir un modo de viaje que genere listas de equipaje automáticas.  
- Usar tecnologías gratuitas o de código abierto siempre que sea posible.  

**Público:** Equipo de desarrollo, QA y operaciones.

---

## 2. Índice de Contenidos (TOC)
1. [Introducción / Objetivo](#1-introducción--objetivo)  
2. [Ambiente de Desarrollo](#3-ambientes_de_desarrollo)  
3. [Base de Datos y Migraciones](#4-base-de-datos-y-migraciones)  
4. [Logs y Auditoría](#5-logs-y-auditoría)  
   - Documentación complementaria: [`docs/control/CONTROL.md`](docs/control/CONTROL.md)
5. [Git y Workflow](#6-git-y-workflow)  
6. [Control de Accesos y Permisos](#7-control-de-accesos-y-permisos)  
   - Detalles de accesos: [`docs/permissions/CHECKLIST.md`](docs/permissions/CHECKLIST.md)
7. [Testing / QA](#8-testing--qa)  
   - Checklist de implementación: [`docs/qa/checklist_implementacion.md`](docs/qa/checklist_implementacion.md)
8. [Despliegue / Staging / Producción](#9-despliegue--staging--producción)  
9. [Onboarding](#10-onboarding)  
10. [Documentación Adicional y Mantenimiento](#11-documentación-adicional-y-mantenimiento)  
 

---

## 3. Ambiente de Desarrollo

### 3.1 Requisitos
- Node.js: versión `18.x`  
- npm o yarn: versión `>=8`  
- React Native / Expo  
- Python 3.11 (pendiente de definir - para scripts QA/automatización)  
- Docker y Docker Compose  
- IDE recomendado: VS Code con extensiones de linting y debugging  

### 3.2 Configuración
- Variables de entorno (`.env.example`):
```env
NODE_ENV=development
DATABASE_URL=mysql://user:password@localhost:3306/pocketcloset
JWT_SECRET=clave_secreta
LOG_LEVEL=info
```

* Scripts de inicialización:

```bash
docker-compose up --build
cd backend && npm install && npm run dev
cd ../frontend && npm install && expo start
```

### 3.3 Accesos al entorno

* Accesos a repositorio GitHub, base de datos de desarrollo y entorno de staging.
* Detalles completos documentados en `docs/permissions/CHECKLIST.md` (**🟡 pendiente de completar**)

---

## 4. Base de Datos y Migraciones

* Tipo: **MySQL**
* Estructura de tablas: **🟡 pendiente de definir**
* Migrations: **🟡 pendiente de definir herramienta y comandos**

---

## 5. Logs y Auditoría

* Niveles de logs: `info`, `warn`, `error` (**🟡 pendiente de definir**)
* Ubicación de logs: **🟡 pendiente de definir**
* Auditoría de acciones críticas: **🟡 pendiente de definir procedimiento**

---

## 6. Git y Workflow

* Branches actuales: `main`, `dev`, `feature-base`, `frontend`, `backend`
* Convenciones de commits: **🟡 pendiente de definir**
* Pull requests y code review obligatorios antes de merge
* Estrategia de merge: **🟡 pendiente de definir**

---

## 7. Control de Accesos y Permisos

* Roles: `Dev`, `QA`, `Ops` (**🟡 pendiente de asignar personas**)
* Accesos a servicios críticos según rol (**🟡 placeholder**)
* Procedimiento para solicitud de acceso: **🟡 pendiente de definir**

---

## 8. Testing / QA

* Herramientas y frameworks: **🟡 pendiente de definir (Jest, Cypress, etc.)**
* Comandos para ejecutar tests: **🟡 pendiente**
* QA manual: **🟡 pendiente**

---

## 9. Despliegue / Staging / Producción

* Pipeline de CI/CD: **🟡 pendiente de definir**
* Variables de entorno por entorno: **🟡 pendiente**
* Procedimiento de rollback: **🟡 pendiente**

---

## 10. Onboarding

* Clonar repositorio:

```bash
git clone git@github.com:stephanny-soares/PocketCloset.git
cd PocketCloset
```

* Levantar contenedores Docker:

```bash
docker-compose up --build
```

* Ejecutar backend:

```bash
cd backend && npm install && npm run dev
```

* Ejecutar frontend:

```bash
cd ../frontend && npm install && expo start
```

---

## 11. Documentación Adicional y Mantenimiento

* README principal 
* ERD y tablas de base de datos (**🟡 pendientes**)

💡 **Nota:** Este documento es un **“vivo”**. Cada sección será completada y actualizada a medida que se desarrollen nuevas funcionalidades, scripts, roles, workflows y procedimientos de despliegue.

---
