# PocketCloset

**PocketCloset** es una aplicación móvil inteligente basada en **Inteligencia Artificial (IA)** que funciona como un **asistente personal de estilo y organización de ropa**.

Permite a los usuarios **gestionar su armario, planificar outfits diarios y preparar prendas para diferentes momentos o actividades**, desde el trabajo o una cena hasta un viaje o un día casual.

El sistema utiliza IA para **clasificar prendas automáticamente**, **sugerir combinaciones adaptadas al clima y la ocasión**, y **organizar la ropa** de manera práctica y visual.

El objetivo principal es **facilitar la toma de decisiones diarias sobre qué vestir** y optimizar el uso de las prendas que ya se tienen.

---

## Objetivos del Proyecto

* Implementar un **asistente inteligente de estilo personal** que aprenda de las preferencias del usuario.
* Permitir **digitalizar el armario físico**, registrando prendas con fotos y clasificándolas mediante IA.
* **Sugerir outfits inteligentes** adaptados a cada momento: trabajo, deporte, ocio, evento o viaje.
* Integrar **datos meteorológicos** para recomendaciones coherentes con el clima.
* Incluir un **modo de viaje** que genere listas de equipaje automáticas.
* Usar **tecnologías gratuitas o de código abierto** siempre que sea posible.

---

## Finalidad

**PocketCloset** busca demostrar cómo la Inteligencia Artificial puede **mejorar la organización personal y el bienestar diario**, ayudando a los usuarios a:

* Reducir el tiempo invertido en decidir qué ponerse.
* Evitar la repetición innecesaria de prendas.
* Optimizar el uso del armario y fomentar un consumo más consciente.
* Prepararse de manera más rápida y eficiente para actividades y viajes.

El MVP mostrará cómo un usuario puede:

* Registrar su ropa en el armario digital.
* Generar looks automáticos adaptados a cada situación.
* Preparar una maleta con un solo clic, todo desde una interfaz **moderna, fluida e intuitiva**.

---

## Funcionalidades principales del MVP

* **Closet Virtual:** registro y clasificación automática de prendas con fotos.
* **Planner de Outfits:** generación automática de combinaciones según momento, clima y estilo del usuario.
* **Modo Viaje (SmartPack):** listas de equipaje inteligentes basadas en el contenido del armario y el contexto del viaje.

---

## Tecnologías

**Frontend:** React Native 
**Backend:** Node.js + Express
**Base de Datos:** MySQL 
**IA / ML:** 
**Autenticación:** Firebase Authentication
**Datos Meteorológicos:** OpenWeatherMap API
**Hosting / CI-CD:** Render / Railway / Expo
**Control de Versiones:** GitHub

---

## Configuración

1. Clonar el repositorio:

```bash
git clone git@github.com:stephanny-soares/PocketCloset.git
cd temp/backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar servidor:

```bash
npm run dev
```

4. Servidor disponible en: `http://localhost:3000/`

Frontend:

```bash
cd ../frontend
expo start
```

---

## Roadmap del desarrollo

**Fase 1 – MVP:** Closet Virtual, Planner de Outfits, Modo Viaje
**Fase 2 – Optimización:** Calendario de estilo, alertas climáticas, historial de uso
**Fase 3 – Expansión IA:** Asistente conversacional, recomendaciones automáticas, estilo personalizado

---
