# 📚 APIRESTful E-commerce Tienda Tech

Este es el **backend** de una plataforma de gestión categorías, productos, carritos, órdenes y usuarios para una e-commerce.
Cuenta con autenticación y endopoints protegidos.

---

## Inicio Rápido

Sigue estos pasos para tener el proyecto funcionando en tu entorno local.

---

### Requisitos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión recomendada: **16 o superior**)
- **npm** (incluido con Node.js)

---

### Instalación

Clona el repositorio y ejecuta el comando de instalación para descargar todas las dependencias:

```bash
# Clonar el repositorio
git clone https://github.com/aaronHenao/API-TiendaTech

# Entrar en la carpeta del proyecto
cd API-TiendaTech

# Instalar dependencias
npm install
```

### Configuración del Entorno (.env)

Para que el proyecto se conecte correctamente a la base de datos y maneje la autenticación, debes crear un archivo llamado **`.env`** en la raíz del proyecto.

Este archivo debe contener las variables de entorno necesarias, como los datos de conexión a la base de datos y la llave secreta para JWT (JSON Web Tokens).

**Ejemplo de estructura básica del archivo `.env`:**

```env
DB_HOST = El host de tu DB
DB_PORT = El puerto en el que corre
DB_USERNAME = Nombre de usuario
DB_DATABASE = Nombre de la DB
DB_PASSWORD = Contraseña de la DB
JWT_SECRET=tu_llave_secreta_aqui
```

**Importante**: No subas el archivo .env al repositorio.
Agrega .env a tu archivo .gitignore.

### Compilación y Ejecución

Una vez configurado el archivo `.env`, compila el código TypeScript a JavaScript y luego ejecuta la aplicación:

```bash
# 1. Compilar el código (TypeScript a JavaScript)
npm run build

# 2. Iniciar el servidor (modo desarrollo)
npm run start:dev
```

El servidor estará disponible en el puerto configurado (por defecto: http://localhost:3000).
