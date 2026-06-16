[🇨🇴 Español](#español) · [🇺🇸 English](#english)

---

## <a name="español">🇨🇴 Español</a>
# 🛒 API RESTful Tienda Tech

## 1. DESCRIPCIÓN GENERAL

**Tienda Tech** es una API RESTful robusta desarrollada con NestJS que automatiza el ciclo completo de vida de una compra en una plataforma de e-commerce. Proporciona gestión integral de categorías, productos, carritos de compra, órdenes y usuarios con un sistema de autenticación JWT y control de permisos basado en roles.

Esta plataforma está diseñada para servir como backend escalable para tiendas en línea especializadas en tecnología, facilitando tanto a administradores como a clientes todas las operaciones necesarias para comprar y vender productos digitales y físicos.

---

## 2. FUNCIONALIDADES PRINCIPALES

✅ **Autenticación y Autorización** - Sistema JWT seguro con login, registro y creación de administradores  
✅ **Gestión de Usuarios** - Control de perfiles de usuario con roles (ADMIN, USER) y permisos diferenciados  
✅ **Catálogo de Productos** - CRUD completo de productos con filtrado por categoría y disponibilidad  
✅ **Gestión de Categorías** - Organización de productos en categorías reutilizables  
✅ **Carrito de Compras** - Agregar, actualizar y eliminar productos del carrito con cálculo de totales  
✅ **Procesamiento de Órdenes** - Generación y seguimiento de pedidos desde el carrito a la compra final  
✅ **Sistema de Reseñas** - Comentarios y calificaciones de usuarios sobre productos  
✅ **Control de Acceso Basado en Roles (RBAC)** - Endpoints protegidos con validación de permisos por rol  

---

## 3. TECNOLOGÍAS UTILIZADAS

### Backend
- **Lenguaje**: TypeScript 5.7
- **Framework**: NestJS 11.0 (arquitectura modular)
- **Validación**: class-validator 0.14, class-transformer 0.5

### Base de Datos
- **Motor**: MySQL 2 (conexión con mysql2 3.15)
- **ORM**: TypeORM 0.3 (sincronización automática de esquema)

### Autenticación y Seguridad
- **JWT**: @nestjs/jwt 11.0 (tokens de acceso)
- **Passport**: @nestjs/passport 11.0 (estrategia JWT)
- **Encriptación**: bcrypt 6.0 (hashing de contraseñas)

### DevOps / Infraestructura
- **Variables de Entorno**: @nestjs/config 4.0
- **Proceso de Compilación**: TypeScript → JavaScript (ts-loader 9.5)
- **Herramientas de Desarrollo**: ts-node, tsconfig-paths

### Testing
- **Framework**: Jest 30.0
- **Configuración**: ts-jest 29.2
- **E2E Testing**: supertest 7.0

### Code Quality
- **Linting**: ESLint 9.18 con typescript-eslint
- **Formatting**: Prettier 3.4
- **Git Hooks**: Integración con ESLint y Prettier

---

## 4. ARQUITECTURA

### Patrón Arquitectónico: Modular MVC

La aplicación sigue la arquitectura modular de **NestJS**, donde cada feature (usuario, producto, orden, etc.) se organiza como un módulo independiente con sus propias capas:

```
src/
├── modules/
│   ├── auth/               # Módulo de autenticación (login, JWT)
│   ├── user/               # Módulo de usuarios (CRUD, roles)
│   ├── product/            # Módulo de productos (catálogo, búsqueda)
│   ├── category/           # Módulo de categorías
│   ├── cart/               # Módulo de carrito de compras
│   ├── order/              # Módulo de órdenes/pedidos
│   ├── review/             # Módulo de reseñas y comentarios
│   ├── guards/             # Guards de autenticación y autorización
│   ├── common/             # DTOs, decoradores y utilidades compartidas
│   └── decorators/         # Decoradores personalizados (@GetUser, @Roles)
├── app.module.ts           # Módulo principal
├── app.controller.ts       # Controlador raíz
├── app.service.ts          # Servicio raíz
└── main.ts                 # Punto de entrada
```

### Flujo de Solicitud

```
Cliente HTTP
    ↓
@Controller Route
    ↓
AuthGuard / RolesGuard (Autenticación y Autorización)
    ↓
Método del Controlador
    ↓
Servicio de Negocio
    ↓
TypeORM / Base de Datos (MySQL)
    ↓
Respuesta JSON (BaseApplicationResponse)
```

### Decisiones Técnicas

- **TypeORM + MySQL**: Sincronización automática de esquemas mediante decoradores de entidades
- **JWT + Passport**: Seguridad sin estado (stateless) para la API
- **RBAC (Roles Guard)**: Control granular de acceso basado en roles de usuario
- **Global ValidationPipe**: Validación automática de DTOs en todas las solicitudes
- **Modular Organization**: Escalabilidad y separación de responsabilidades

---

## 5. REQUISITOS PREVIOS

Antes de instalar y ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js**: versión 16.0 o superior ([Descargar](https://nodejs.org/))
- **npm**: versión 8.0 o superior (incluido con Node.js)
- **MySQL Server**: versión 5.7 o superior ([Descargar](https://www.mysql.com/downloads/))
- **Git**: para clonar el repositorio ([Descargar](https://git-scm.com/))

### Verificar instalación

```bash
node --version      # Debe mostrar v16.0.0 o superior
npm --version       # Debe mostrar 8.0.0 o superior
mysql --version     # Debe mostrar 5.7.0 o superior
```

---

## 6. VARIABLES DE ENTORNO (.env)

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# ==========================================
# CONFIGURACIÓN DEL SERVIDOR
# ==========================================
PORT=3000                           # Puerto en el que se ejecutará el servidor (default: 3000)

# ==========================================
# CONFIGURACIÓN DE BASE DE DATOS
# ==========================================
DB_HOST=localhost                   # Host del servidor MySQL (localhost para desarrollo local)
DB_PORT=3306                        # Puerto de MySQL (default: 3306)
DB_USERNAME=root                    # Usuario de MySQL
DB_PASSWORD=tu_contrasena           # Contraseña del usuario de MySQL
DB_DATABASE=tienda_tech             # Nombre de la base de datos

# ==========================================
# CONFIGURACIÓN DE SEGURIDAD (JWT)
# ==========================================
JWT_SECRET=tu_clave_secreta_muy_segura_aqui  # Clave privada para firmar tokens JWT (cambiar en producción)
```

### Notas Importantes

- **No subas el archivo `.env` al repositorio** (está en `.gitignore`)
- En **desarrollo local**: usa contraseñas simples
- En **producción**: usa contraseñas complejas y variables de entorno seguras
- El `JWT_SECRET` debe ser una cadena aleatoria larga (mínimo 32 caracteres)

---

## 7. INSTRUCCIONES DE INSTALACIÓN Y EJECUCIÓN

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/aaronHenao/API-TiendaTech
cd API-TiendaTech
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env   # Si existe un archivo de ejemplo
# O crea manualmente el archivo .env con las variables de la sección anterior
```

### Paso 4: Crear la Base de Datos en MySQL

```bash
# Conectarse a MySQL
mysql -u root -p

# En la consola de MySQL, ejecutar:
CREATE DATABASE tienda_tech;
EXIT;
```

**Nota**: TypeORM sincronizará automáticamente las tablas al iniciar la aplicación.

### Paso 5: Compilar el Código TypeScript

```bash
npm run build
```

### Paso 6: Ejecutar el Proyecto

#### Modo Desarrollo (con hot-reload)

```bash
npm run start:dev
```

El servidor estará disponible en: **http://localhost:3000**

#### Modo Producción

```bash
npm run start:prod
```

#### Modo Debug

```bash
npm run start:debug
```

### Paso 7: Crear el Primer Administrador

Después de que el servidor esté ejecutándose, realiza una petición POST al endpoint temporal:

```bash
curl -X POST http://localhost:3000/user/create-first-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "contraseña_segura",
    "nombre": "Administrador"
  }'
```

⚠️ **IMPORTANTE**: Después de crear el primer admin, **elimina o comenta** el endpoint `create-first-admin` en `src/user/user.controller.ts` (líneas 37-46) por razones de seguridad.

### Paso 8: Usar el Sistema

Una vez creado el admin, usa el endpoint protegido para crear más administradores:

```bash
# Primero, obtener un token JWT con el login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "contraseña_segura"
  }'

# Luego, crear nuevos admins con el token
curl -X POST http://localhost:3000/user/admin \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN_JWT>" \
  -d '{
    "email": "otro_admin@example.com",
    "password": "contraseña_segura",
    "nombre": "Otro Admin"
  }'
```

---

## Comandos Útiles

```bash
# Desarrollo
npm run start:dev          # Inicia en modo desarrollo con hot-reload

# Testing
npm test                   # Ejecuta tests unitarios
npm run test:watch        # Ejecuta tests en modo watch
npm run test:cov          # Genera reporte de coverage
npm run test:e2e          # Ejecuta tests E2E

# Code Quality
npm run lint              # Ejecuta ESLint y corrige errores
npm run format            # Formatea el código con Prettier

# Producción
npm run build             # Compila TypeScript a JavaScript
npm run start:prod        # Ejecuta el build compilado
```

---

## 8. ESTRUCTURA DEL PROYECTO

```
API-TiendaTech/
├── src/
│   ├── auth/                          # Módulo de autenticación
│   │   ├── auth.controller.ts         # Endpoints de login
│   │   ├── auth.module.ts             # Configuración del módulo
│   │   ├── auth.service.ts            # Lógica de autenticación
│   │   ├── dto/                       # Data Transfer Objects
│   │   │   ├── login.dto.ts           # DTO para login
│   │   │   └── login-response.dto.ts  # DTO de respuesta
│   │   └── jwt.strategy/              # Estrategia JWT de Passport
│   │
│   ├── user/                          # Módulo de usuarios
│   │   ├── user.controller.ts         # Endpoints de CRUD de usuarios
│   │   ├── user.module.ts             # Configuración del módulo
│   │   ├── user.service.ts            # Lógica de negocio de usuarios
│   │   ├── entities/                  # Entidades de base de datos
│   │   │   └── user.entity.ts         # Modelo de Usuario
│   │   └── dto/                       # DTOs
│   │       ├── create-user.dto.ts     # DTO para crear usuario
│   │       └── user-response.dto.ts   # DTO de respuesta
│   │
│   ├── product/                       # Módulo de productos
│   │   ├── product.controller.ts      # Endpoints de CRUD de productos
│   │   ├── product.module.ts          # Configuración del módulo
│   │   ├── product.service.ts         # Lógica de gestión de productos
│   │   ├── entities/                  # Entidades
│   │   │   └── product.entity.ts      # Modelo de Producto
│   │   └── dto/                       # DTOs
│   │       ├── create-product.dto.ts  # DTO para crear producto
│   │       ├── update-product.dto.ts  # DTO para actualizar
│   │       └── product-response.dto.ts
│   │
│   ├── category/                      # Módulo de categorías
│   │   ├── category.controller.ts     # Endpoints de CRUD
│   │   ├── category.module.ts         # Configuración del módulo
│   │   ├── category.service.ts        # Lógica de categorías
│   │   ├── entities/                  # Entidades
│   │   │   └── category.entity.ts     # Modelo de Categoría
│   │   └── dto/                       # DTOs
│   │
│   ├── cart/                          # Módulo de carrito
│   │   ├── cart.controller.ts         # Endpoints de carrito
│   │   ├── cart.module.ts             # Configuración del módulo
│   │   ├── cart.service.ts            # Lógica de gestión del carrito
│   │   ├── entities/                  # Entidades
│   │   │   └── cart.entity.ts         # Modelo de Carrito
│   │   └── dto/                       # DTOs
│   │
│   ├── order/                         # Módulo de órdenes
│   │   ├── order.controller.ts        # Endpoints de órdenes
│   │   ├── order.module.ts            # Configuración del módulo
│   │   ├── order.service.ts           # Lógica de procesamiento de órdenes
│   │   ├── entities/                  # Entidades
│   │   │   └── order.entity.ts        # Modelo de Orden
│   │   └── dto/                       # DTOs
│   │
│   ├── review/                        # Módulo de reseñas
│   │   ├── review.controller.ts       # Endpoints de reseñas
│   │   ├── review.module.ts           # Configuración del módulo
│   │   ├── review.service.ts          # Lógica de reseñas
│   │   ├── entities/                  # Entidades
│   │   │   └── review.entity.ts       # Modelo de Reseña
│   │   └── dto/                       # DTOs
│   │
│   ├── guards/                        # Guards de autenticación
│   │   ├── roles.guard.ts             # Guard para validar roles
│   │   └── jwt.guard.ts               # Guard para JWT (si aplica)
│   │
│   ├── common/                        # Utilidades compartidas
│   │   ├── decorators/                # Decoradores personalizados
│   │   │   ├── roles/                 # Decorador @Roles
│   │   │   │   └── roles.decorator.ts
│   │   │   └── get-user/              # Decorador @GetUser
│   │   │       └── get-user.decorator.ts
│   │   └── dto/                       # DTOs reutilizables
│   │       └── base-application-response.dto.ts  # Respuesta estándar
│   │
│   ├── app.controller.ts              # Controlador raíz
│   ├── app.module.ts                  # Módulo raíz (importa todos los módulos)
│   ├── app.service.ts                 # Servicio raíz
│   └── main.ts                        # Punto de entrada de la aplicación
│
├── test/                              # Tests E2E
│   └── jest-e2e.json                  # Configuración de Jest para E2E
│
├── dist/                              # Código compilado (generado por build)
├── node_modules/                      # Dependencias (generado por npm install)
│
├── .env                               # Variables de entorno (NO SUBIR AL REPO)
├── .env.example                       # Ejemplo de variables de entorno
├── .gitignore                         # Archivos ignorados por Git
├── .prettierrc                        # Configuración de Prettier
├── eslint.config.mjs                  # Configuración de ESLint
├── nest-cli.json                      # Configuración de NestJS CLI
├── package.json                       # Dependencias del proyecto
├── package-lock.json                  # Lock file de dependencias
├── tsconfig.json                      # Configuración de TypeScript
├── tsconfig.build.json                # Configuración de TypeScript para build
├── README.md                          # Este archivo
└── LICENSE                            # Licencia del proyecto
```

---

## 📝 Notas Adicionales

- **Sincronización de BD**: TypeORM sincroniza automáticamente las entidades con la BD al iniciar (ver `app.module.ts` línea 29: `synchronize: true`)
- **Validación Global**: Todo DTO se valida automáticamente gracias a `ValidationPipe` en `main.ts`
- **Decorador @GetUser**: Extrae el usuario actual del token JWT en endpoints protegidos
- **Decorador @Roles**: Define qué rol es necesario para acceder a un endpoint
- **Guard RolesGuard**: Valida que el usuario tenga el rol requerido antes de permitir el acceso

---

## 📞 Soporte y Contribuciones

Para reportar problemas, hacer preguntas o contribuir al proyecto, por favor abre un [issue](https://github.com/aaronHenao/API-TiendaTech/issues) en el repositorio.

---

## 📄 Licencia

Este proyecto está bajo la licencia UNLICENSED.

---

**Última actualización**: Junio 2026

---

## <a name="english">🇺🇸 English</a>
# 🛒 Tech Store RESTful API

## 1. OVERVIEW

**Tech Store** is a robust RESTful API developed with NestJS that automates the entire purchase lifecycle on an e-commerce platform. It provides comprehensive management of categories, products, shopping carts, orders, and users with a JWT authentication system and role-based permission control.

This platform is designed to serve as a scalable backend for online stores specializing in technology, providing both administrators and customers with all the necessary operations to buy and sell digital and physical products.

---

## 2. KEY FEATURES

✅ **Authentication and Authorization** - Secure JWT system with login, registration, and administrator creation  
✅ **User Management** - Control of user profiles with roles (ADMIN, USER) and differentiated permissions  
✅ **Product Catalog** - Full CRUD for products with filtering by category and availability  
✅ **Category Management** - Organization of products into reusable categories  
✅ **Shopping Cart** - Add, update, and remove products from the cart with total calculation  
✅ **Order Processing** - Order generation and tracking from the cart to final purchase  
✅ **Review System** - User comments and ratings on products  
✅ **Role-Based Access Control (RBAC)** - Endpoints protected with role-based permission validation  

---

## 3. TECHNOLOGIES USED

### Backend
- **Language**: TypeScript 5.7
- **Framework**: NestJS 11.0 (modular architecture)
- **Validation**: class-validator 0.14, class-transformer 0.5

### Database
- **Engine**: MySQL 2 (connection via mysql2 3.15)
- **ORM**: TypeORM 0.3 (automatic schema synchronization)

### Authentication and Security
- **JWT**: @nestjs/jwt 11.0 (access tokens)
- **Passport**: @nestjs/passport 11.0 (JWT strategy)
- **Encryption**: bcrypt 6.0 (password hashing)

### DevOps / Infrastructure
- **Environment Variables**: @nestjs/config 4.0
- **Compilation Process**: TypeScript → JavaScript (ts-loader 9.5)
- **Development Tools**: ts-node, tsconfig-paths

### Testing
- **Framework**: Jest 30.0
- **Configuration**: ts-jest 29.2
- **E2E Testing**: supertest 7.0

### Code Quality
- **Linting**: ESLint 9.18 with typescript-eslint
- **Formatting**: Prettier 3.4
- **Git Hooks**: Integration with ESLint and Prettier

---

## 4. ARCHITECTURE

### Architectural Pattern: Modular MVC

The application follows the modular architecture of **NestJS**, where each feature (user, product, order, etc.) is organized as an independent module with its own layers:

```
src/
├── modules/
│   ├── auth/               # Authentication module (login, JWT)
│   ├── user/               # User module (CRUD, roles)
│   ├── product/            # Product module (catalog, search)
│   ├── category/           # Category module
│   ├── cart/               # Shopping cart module
│   ├── order/              # Orders module
│   ├── review/             # Reviews and comments module
│   ├── guards/             # Authentication and authorization guards
│   ├── common/             # DTOs, decorators, and shared utilities
│   └── decorators/         # Custom decorators (@GetUser, @Roles)
├── app.module.ts           # Main module
├── app.controller.ts       # Root controller
├── app.service.ts          # Root service
└── main.ts                 # Entry point
```

### Request Flow

```
HTTP Client
    ↓
@Controller Route
    ↓
AuthGuard / RolesGuard (Authentication and Authorization)
    ↓
Controller Method
    ↓
Business Service
    ↓
TypeORM / Database (MySQL)
    ↓
JSON Response (BaseApplicationResponse)
```

### Technical Decisions

- **TypeORM + MySQL**: Automatic schema synchronization using entity decorators
- **JWT + Passport**: Stateless security for the API
- **RBAC (Roles Guard)**: Granular access control based on user roles
- **Global ValidationPipe**: Automatic validation of DTOs in all requests
- **Modular Organization**: Scalability and separation of concerns

---

## 5. PREREQUISITES

Before installing and running the project, make sure you have the following installed:

- **Node.js**: version 16.0 or higher ([Download](https://nodejs.org/))
- **npm**: version 8.0 or higher (included with Node.js)
- **MySQL Server**: version 5.7 or higher ([Download](https://www.mysql.com/downloads/))
- **Git**: to clone the repository ([Download](https://git-scm.com/))

### Verify Installation

```bash
node --version      # Should show v16.0.0 or higher
npm --version       # Should show 8.0.0 or higher
mysql --version     # Should show 5.7.0 or higher
```

---

## 6. ENVIRONMENT VARIABLES (.env)

Create a `.env` file in the project root directory with the following variables:

```env
# ==========================================
# SERVER CONFIGURATION
# ==========================================
PORT=3000                           # Port on which the server will run (default: 3000)

# ==========================================
# DATABASE CONFIGURATION
# ==========================================
DB_HOST=localhost                   # MySQL server host (localhost for local development)
DB_PORT=3306                        # MySQL port (default: 3306)
DB_USERNAME=root                    # MySQL username
DB_PASSWORD=your_password           # MySQL user password
DB_DATABASE=tech_store             # Database name

# ==========================================
# SECURITY CONFIGURATION (JWT)
# ==========================================
JWT_SECRET=your_very_secure_secret_key_here  # Private key for signing JWT tokens (change in production)
```

### Important Notes

- **Do not upload the `.env` file to the repository** (it is in `.gitignore`)
- In **local development**: use simple passwords
- In **production**: use complex passwords and secure environment variables
- The `JWT_SECRET` must be a long random string (minimum 32 characters)

---

## 7. INSTALLATION AND RUNNING INSTRUCTIONS

### Step 1: Clone the Repository

```bash
git clone https://github.com/aaronHenao/API-TiendaTech
cd API-TiendaTech
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env   # If an example file exists
# Or manually create the .env file with the variables from the previous section
```

### Step 4: Create the Database in MySQL

```bash
# Connect to MySQL
mysql -u root -p

# In the MySQL console, run:
CREATE DATABASE tienda_tech;
EXIT;
```

**Note**: TypeORM will automatically synchronize the tables when the application starts.

### Step 5: Compile the TypeScript Code

```bash
npm run build
```

### Step 6: Run the Project

#### Development Mode (with hot-reload)

```bash
npm run start:dev
```

The server will be available at: **http://localhost:3000**

#### Production Mode

```bash
npm run start:prod
```

#### Debug Mode

```bash
npm run start:debug
```

### Step 7: Create the First Administrator

After the server is running, make a POST request to the temporary endpoint:

```bash
curl -X POST http://localhost:3000/user/create-first-admin \
  -H “Content-Type: application/json” \
  -d '{
    “email”: “admin@example.com”,
    “password”: “secure_password”,
    “name”: “Administrator”
  }'
```

⚠️ **IMPORTANT**: After creating the first admin, **delete or comment out** the `create-first-admin` endpoint in `src/user/user.controller.ts` (lines 37–46) for security reasons.

### Step 8: Using the System

Once the admin has been created, use the protected endpoint to create more administrators:

```bash
# First, obtain a JWT token with the login
curl -X POST http://localhost:3000/auth/login \
  -H “Content-Type: application/json” \
  -d '{
    “email”: “admin@example.com”,
    “password”: “secure_password”
  }'

# Then, create new admins using the token
curl -X POST http://localhost:3000/user/admin \
  -H “Content-Type: application/json” \
  -H “Authorization: Bearer <TOKEN_JWT>” \
  -d '{
    “email”: “otro_admin@example.com”,
    “password”: “secure_password”,
    “name”: “Another Admin”
  }'
```

---

## Useful Commands

```bash
# Development
npm run start:dev          # Starts in development mode with hot-reload

# Testing
npm test                   # Runs unit tests
npm run test:watch        # Runs tests in watch mode
npm run test:cov          # Generates a code coverage report
npm run test:e2e          # Runs E2E tests

# Code Quality
npm run lint              # Runs ESLint and fixes errors
npm run format            # Formats the code with Prettier

# Production
npm run build             # Compiles TypeScript to JavaScript
npm run start:prod        # Runs the compiled build
```

---
## 8. PROJECT STRUCTURE

```
API-TiendaTech/
├── src/
│   ├── auth/                          # Authentication module
│   │   ├── auth.controller.ts         # Login endpoints
│   │   ├── auth.module.ts             # Module configuration
│   │   ├── auth.service.ts            # Authentication logic
│   │   ├── dto/                       # Data Transfer Objects
│   │   │   ├── login.dto.ts           # Login DTO
│   │   │   └── login-response.dto.ts  # Response DTO
│   │   └── jwt.strategy/              # Passport JWT strategy
│   │
│   ├── user/                          # User module
│   │   ├── user.controller.ts         # User CRUD endpoints
│   │   ├── user.module.ts             # Module configuration
│   │   ├── user.service.ts            # User business logic
│   │   ├── entities/                  # Database entities
│   │   │   └── user.entity.ts         # User model
│   │   └── dto/                       # DTOs
│   │       ├── create-user.dto.ts     # DTO for creating a user
│   │       └── user-response.dto.ts   # Response DTO
│   │
│   ├── product/                       # Product module
│   │   ├── product.controller.ts      # Product CRUD endpoints
│   │   ├── product.module.ts          # Module configuration
│   │   ├── product.service.ts         # Product management logic
│   │   ├── entities/                  # Entities
│   │   │   └── product.entity.ts      # Product model
│   │   └── dto/                       # DTOs
│   │       ├── create-product.dto.ts  # DTO for creating a product
│   │       ├── update-product.dto.ts  # DTO for updating
│   │       └── product-response.dto.ts
│   │
│   ├── category/                      # Categories module
│   │   ├── category.controller.ts     # CRUD endpoints
│   │   ├── category.module.ts         # Module configuration
│   │   ├── category.service.ts        # Category logic
│   │   ├── entities/                  # Entities
│   │   │   └── category.entity.ts     # Category model
│   │   └── dto/                       # DTOs
│   │
│   ├── cart/                          # Cart module
│   │   ├── cart.controller.ts         # Cart endpoints
│   │   ├── cart.module.ts             # Module configuration
│   │   ├── cart.service.ts            # Cart management logic
│   │   ├── entities/                  # Entities
│   │   │   └── cart.entity.ts         # Cart model
│   │   └── dto/                       # DTOs
│   │
│   ├── order/                         # Order module
│   │   ├── order.controller.ts        # Order endpoints
│   │   ├── order.module.ts            # Module configuration
│   │   ├── order.service.ts           # Order processing logic
│   │   ├── entities/                  # Entities
│   │   │   └── order.entity.ts        # Order model
│   │   └── dto/                       # DTOs
│   │
│   ├── review/                        # Reviews module
│   │   ├── review.controller.ts       # Reviews endpoints
│   │   ├── review.module.ts           # Module configuration
│   │   ├── review.service.ts          # Review logic
│   │   ├── entities/                  # Entities
│   │   │   └── review.entity.ts       # Review model
│   │   └── dto/                       # DTOs
│   │
│   ├── guards/                        # Authentication guards
│   │   ├── roles.guard.ts             # Guard to validate roles
│   │   └── jwt.guard.ts               # Guard for JWT (if applicable)
│   │
│   ├── common/                        # Shared utilities
│   │   ├── decorators/                # Custom decorators
│   │   │   ├── roles/                 # @Roles decorator
│   │   │   │   └── roles.decorator.ts
│   │   │   └── get-user/              # @GetUser decorator
│   │   │       └── get-user.decorator.ts
│   │   └── dto/                       # Reusable DTOs
│   │       └── base-application-response.dto.ts  # Standard response
│   │
│   ├── app.controller.ts              # Root controller
│   ├── app.module.ts                  # Root module (imports all modules)
│   ├── app.service.ts                 # Root service
│   └── main.ts                        # Application entry point
│
├── test/                              # E2E tests
│   └── jest-e2e.json                  # Jest configuration for E2E
│
├── dist/                              # Compiled code (generated by build)
├── node_modules/                      # Dependencies (generated by npm install)
│
├── .env                               # Environment variables (DO NOT UPLOAD TO THE REPO)
├── .env.example                       # Example environment variables
├── .gitignore                         # Files ignored by Git
├── .prettierrc                        # Prettier configuration
├── eslint.config.mjs                  # ESLint configuration
├── nest-cli.json                      # NestJS CLI configuration
├── package.json                       # Project dependencies
├── package-lock.json                  # Dependency lock file
├── tsconfig.json                      # TypeScript configuration
├── tsconfig.build.json                # TypeScript build configuration
├── README.md                          # This file
└── LICENSE                            # Project license
```

---

## 📝 Additional Notes

- **DB Synchronization**: TypeORM automatically synchronizes entities with the database on startup (see `app.module.ts`, line 29: `synchronize: true`)
- **Global Validation**: All DTOs are automatically validated using `ValidationPipe` in `main.ts`
- **@GetUser Decorator**: Retrieves the current user from the JWT token on protected endpoints
- **@Roles Decorator**: Defines which role is required to access an endpoint
- **RolesGuard**: Validates that the user has the required role before granting access

---

## 📞 Support and Contributions

To report issues, ask questions, or contribute to the project, please open an [issue](https://github.com/aaronHenao/API-TiendaTech/issues) in the repository.

---

## 📄 License

This project is licensed under the UNLICENSED license.

---

**Last updated**: June 2026
