# Tickets Web - Proyecto de Autenticación y Dashboard

Este proyecto implementa un sistema de autenticación y gestión de tickets con **React + TypeScript + Vite** en el frontend y **Spring Boot** en el backend.

## ✅ Puntos cumplidos

### 1. Visualización de datos del usuario en el Dashboard
- Al iniciar sesión, se muestran en el Dashboard los datos completos del usuario autenticado:
  - **Nombre y Apellido** → Ejemplo: *Administrador Sistema*
  - **Rol** → Ejemplo: *ADMIN*
- Esto se logra consumiendo la API de login y guardando los datos en el contexto (`AuthContext`).

### 2. Persistencia de sesión con LocalStorage
- Los datos del usuario (`token, username, nombre, apellido, role`) se guardan en `localStorage`.
- Al refrescar la página, el contexto (`AuthContext`) restaura automáticamente la sesión.
- El Dashboard sigue mostrando la información del usuario sin necesidad de volver a loguear.

## 🚀 Tecnologías utilizadas
- **Frontend:** React, TypeScript, TailwindCSS, Vite
- **Backend:** Spring Boot
- **Autenticación:** JWT + Context API
- **Persistencia:** LocalStorage

## 📂 Estructura relevante del frontend
- `src/api/http.ts` → Helper para llamadas HTTP con manejo de token.
- `src/api/auth.ts` → API de login.
- `src/context/AuthContext.tsx` → Contexto global de autenticación.
- `src/pages/LoginPage.tsx` → Página de login.
- `src/pages/DashboardPage.tsx` → Dashboard protegido que muestra datos del usuario.

## ▶️ Cómo probar
1. Clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPO>
   cd tickets-web
## ▶️: Instalar dependencias: 
  npm install

## ▶️:Ejecutar el frontend:
  npm run dev

## niciar sesión con un usuario válido (ejemplo: admin / admin123).
## 3. Crear Ticket desde Formulario

Se implementó un formulario en React para registrar nuevos tickets consumiendo la API REST del backend Spring Boot.

El formulario permite ingresar:

- Título
- Descripción
- Estado
- Prioridad
- Categoría

La información es enviada mediante Axios utilizando autenticación JWT.

Una vez creado el ticket, este se visualiza automáticamente en el dashboard principal.