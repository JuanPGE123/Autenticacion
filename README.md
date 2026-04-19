# 🚀 API de Registro y Autenticación de Usuarios

**Evidencia de desempeño:** GA7-220501096-AA5-EV01  
**Título:** Diseño y desarrollo de servicios web - Caso  
**Autor:** Juan Pablo Giraldo Echavarria  
**Fecha:** 19 de abril de 2026

---

## 📋 Descripción del Proyecto

API REST completa para registro y autenticación de usuarios, desarrollada con **Node.js** y **Express**. El proyecto implementa un sistema seguro de gestión de usuarios con las siguientes funcionalidades:

- ✅ Registro de nuevos usuarios
- ✅ Inicio de sesión (login)
- ✅ Validación de credenciales
- ✅ Hash de contraseñas con bcrypt
- ✅ Validación de datos de entrada
- ✅ Manejo profesional de errores
- ✅ Código completamente comentado

---

## 🎯 Objetivos Cumplidos

✔️ **Registro de usuarios** - Endpoint funcional para crear nuevos usuarios  
✔️ **Inicio de sesión** - Autenticación con validación de credenciales  
✔️ **Seguridad básica** - Hash de contraseñas y validación de datos  
✔️ **Estructura profesional** - Organización clara en capas (rutas, controladores, servicios)  
✔️ **Comentarios detallados** - Todo el código está documentado  
✔️ **Manejo de errores** - Respuestas claras para cada situación

---

## 📁 Estructura del Proyecto

```
INICIO SESION/
│
├── src/                          # Código fuente
│   ├── app.js                    # Archivo principal - Configuración del servidor
│   │
│   ├── routes/                   # Definición de rutas
│   │   └── authRoutes.js         # Rutas de autenticación
│   │
│   ├── controllers/              # Controladores (lógica de peticiones HTTP)
│   │   └── authController.js     # Controlador de autenticación
│   │
│   ├── services/                 # Servicios (lógica de negocio)
│   │   └── authService.js        # Servicio de autenticación
│   │
│   └── middlewares/              # Middlewares
│       └── validationMiddleware.js  # Validación de datos
│
├── package.json                  # Dependencias y scripts
├── .gitignore                    # Archivos ignorados por Git
├── .env.example                  # Ejemplo de variables de entorno
├── README.md                     # Esta documentación
├── GUIA_COMMITS.md              # Guía de commits Git
└── EJEMPLOS_USO.md              # Ejemplos de uso de la API
```

### 🏗️ Arquitectura en Capas

El proyecto sigue el patrón **MVC (Modelo-Vista-Controlador)** adaptado para APIs:

1. **Rutas** (`routes/`) - Definen los endpoints y los conectan con controladores
2. **Controladores** (`controllers/`) - Manejan las peticiones HTTP y respuestas
3. **Servicios** (`services/`) - Contienen la lógica de negocio
4. **Middlewares** (`middlewares/`) - Validación y procesamiento previo de datos

---

## 🔌 Endpoints Disponibles

### 1️⃣ Registro de Usuario

**Endpoint:** `POST /api/auth/registro`

**Descripción:** Registra un nuevo usuario en el sistema

**Body (JSON):**
```json
{
  "usuario": "nombre_usuario",
  "contraseña": "contraseña_segura"
}
```

**Respuesta Exitosa (201):**
```json
{
  "mensaje": "Usuario registrado exitosamente",
  "usuario": "nombre_usuario",
  "timestamp": "2026-04-19T10:30:00.000Z"
}
```

**Respuesta de Error (400):**
```json
{
  "error": "El usuario ya existe"
}
```

---

### 2️⃣ Inicio de Sesión (Login)

**Endpoint:** `POST /api/auth/login`

**Descripción:** Autentica un usuario existente

**Body (JSON):**
```json
{
  "usuario": "nombre_usuario",
  "contraseña": "contraseña_segura"
}
```

**Respuesta Exitosa (200):**
```json
{
  "mensaje": "Autenticación satisfactoria",
  "usuario": "nombre_usuario",
  "timestamp": "2026-04-19T10:35:00.000Z"
}
```

**Respuesta de Error (401):**
```json
{
  "error": "Credenciales incorrectas",
  "mensaje": "Contraseña incorrecta"
}
```

---

### 3️⃣ Listar Usuarios (Para pruebas)

**Endpoint:** `GET /api/auth/usuarios`

**Descripción:** Obtiene lista de usuarios registrados

**Respuesta (200):**
```json
{
  "total": 2,
  "usuarios": ["usuario1", "usuario2"],
  "nota": "Esta ruta es solo para propósitos de prueba"
}
```

---

### 4️⃣ Información de la API

**Endpoint:** `GET /`

**Descripción:** Información general y endpoints disponibles

**Respuesta (200):**
```json
{
  "mensaje": "🚀 API de Registro y Autenticación - SENA",
  "version": "1.0.0",
  "evidencia": "GA7-220501096-AA5-EV01",
  "endpoints": {
    "registro": "POST /api/auth/registro",
    "login": "POST /api/auth/login",
    "usuarios": "GET /api/auth/usuarios"
  }
}
```

---

## 🚀 Instalación y Ejecución

### Requisitos Previos

- **Node.js** (versión 14 o superior)
- **npm** (viene incluido con Node.js)

### Paso 1: Verificar Instalación de Node.js

Abre una terminal y ejecuta:

```powershell
node --version
npm --version
```

Si no tienes Node.js instalado, descárgalo desde: https://nodejs.org/

### Paso 2: Navegar al Directorio del Proyecto

```powershell
cd "d:\OneDrive\SENA\PROYECTOS\INICIO SESION"
```

### Paso 3: Instalar Dependencias

```powershell
npm install
```

Este comando instala todas las dependencias listadas en `package.json`:
- **express** - Framework web
- **bcrypt** - Hash de contraseñas
- **dotenv** - Variables de entorno
- **nodemon** - Auto-reinicio del servidor (dev)

### Paso 4: Configurar Variables de Entorno

Copia el archivo de ejemplo y crea tu archivo `.env`:

```powershell
copy .env.example .env
```

Edita `.env` si necesitas cambiar el puerto (por defecto es 3000).

### Paso 5: Iniciar el Servidor

**Modo desarrollo (con auto-reinicio):**
```powershell
npm run dev
```

**Modo producción:**
```powershell
npm start
```

### ✅ Resultado Esperado

Deberías ver en la consola:

```
========================================
🚀 SERVIDOR INICIADO CORRECTAMENTE
========================================
📡 Puerto: 3000
🌐 URL: http://localhost:3000
📚 Endpoints disponibles:
   - GET  http://localhost:3000/
   - POST http://localhost:3000/api/auth/registro
   - POST http://localhost:3000/api/auth/login
   - GET  http://localhost:3000/api/auth/usuarios
========================================
⏸️  Presiona Ctrl+C para detener el servidor
========================================
```

---

## 🧪 Pruebas de la API

Puedes probar la API de varias formas:

### Opción 1: Thunder Client (Extensión de VS Code)

1. Instala la extensión **Thunder Client** en VS Code
2. Crea una nueva petición
3. Usa los ejemplos del archivo `EJEMPLOS_USO.md`

### Opción 2: Postman

1. Descarga Postman desde https://www.postman.com/
2. Importa las peticiones desde `EJEMPLOS_USO.md`

### Opción 3: cURL (Línea de Comandos)

**Registrar usuario:**
```powershell
curl -X POST http://localhost:3000/api/auth/registro `
-H "Content-Type: application/json" `
-d '{\"usuario\":\"juan123\",\"contraseña\":\"segura123\"}'
```

**Iniciar sesión:**
```powershell
curl -X POST http://localhost:3000/api/auth/login `
-H "Content-Type: application/json" `
-d '{\"usuario\":\"juan123\",\"contraseña\":\"segura123\"}'
```

**Listar usuarios:**
```powershell
curl http://localhost:3000/api/auth/usuarios
```

---

## 🔒 Seguridad Implementada

### 1. Hash de Contraseñas

Las contraseñas **NUNCA** se almacenan en texto plano. Se usa **bcrypt** para:
- Generar un hash seguro de cada contraseña
- Comparar contraseñas de forma segura durante el login

```javascript
// Ejemplo de hash
"contraseña123" → "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
```

### 2. Validación de Datos

Cada petición es validada antes de procesarse:

**Validaciones de usuario:**
- ✅ Mínimo 3 caracteres
- ✅ Máximo 20 caracteres
- ✅ Solo letras, números y guión bajo
- ✅ No puede empezar con número

**Validaciones de contraseña:**
- ✅ Mínimo 6 caracteres
- ✅ No puede contener espacios

### 3. Manejo de Errores

Respuestas claras para cada tipo de error:
- `400` - Datos inválidos o incompletos
- `401` - Credenciales incorrectas
- `404` - Ruta no encontrada
- `500` - Error interno del servidor

---

## 📝 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Node.js** | 14+ | Entorno de ejecución JavaScript |
| **Express** | 4.18.2 | Framework web para crear la API |
| **bcrypt** | 5.1.1 | Hash seguro de contraseñas |
| **dotenv** | 16.3.1 | Gestión de variables de entorno |
| **nodemon** | 3.0.1 | Auto-reinicio durante desarrollo |

---

## 💾 Almacenamiento de Datos

⚠️ **IMPORTANTE:** Este proyecto usa **almacenamiento en memoria** (JavaScript Map) para fines educativos.

**Implicaciones:**
- Los datos se pierden al reiniciar el servidor
- No hay persistencia entre ejecuciones
- Adecuado solo para desarrollo y pruebas

**Para un sistema real, se debería usar:**
- Base de datos SQL (MySQL, PostgreSQL)
- Base de datos NoSQL (MongoDB)
- ORM como Sequelize o Mongoose

---

## 🔄 Control de Versiones (Git)

### Inicializar Repositorio

```powershell
git init
git add .
git commit -m "Initial commit: Proyecto API de autenticación"
```

### Commits Sugeridos

Consulta el archivo `GUIA_COMMITS.md` para una secuencia detallada de commits profesionales.

**Ejemplo de flujo:**
```powershell
git add package.json
git commit -m "feat: Configuración inicial del proyecto con dependencias"

git add src/app.js
git commit -m "feat: Configuración del servidor Express"

git add src/routes/
git commit -m "feat: Definición de rutas de autenticación"

# ... ver GUIA_COMMITS.md para más
```

---

## 📚 Archivos de Documentación

- **README.md** (este archivo) - Documentación principal
- **EJEMPLOS_USO.md** - Ejemplos detallados de peticiones/respuestas
- **GUIA_COMMITS.md** - Guía de commits Git profesionales

---

## 🎓 Objetivos Pedagógicos Cumplidos

✅ **Diseño de API REST** - Estructura profesional de endpoints  
✅ **Autenticación** - Sistema funcional de login  
✅ **Validación** - Verificación de datos de entrada  
✅ **Seguridad** - Hash de contraseñas con bcrypt  
✅ **Organización** - Arquitectura en capas clara  
✅ **Documentación** - Código completamente comentado  
✅ **Buenas prácticas** - Manejo de errores y respuestas HTTP apropiadas

---

## 🐛 Solución de Problemas

### Error: "Cannot find module 'express'"

**Solución:** Ejecuta `npm install` para instalar dependencias

### Error: "Port 3000 is already in use"

**Solución:** 
1. Cambia el puerto en el archivo `.env`:
   ```
   PORT=3001
   ```
2. O cierra la aplicación que está usando el puerto 3000

### Error: "bcrypt error"

**Solución:** 
```powershell
npm uninstall bcrypt
npm install bcrypt
```

---

## 👨‍💻 Autor

**Nombre:** [Tu nombre]  
**Programa:** [Tu programa SENA]  
**Ficha:** [Tu número de ficha]  
**Evidencia:** GA7-220501096-AA5-EV01

---

## 📄 Licencia

Este proyecto es con fines educativos para el SENA.

---

## 📞 Soporte

Para preguntas sobre el proyecto:
1. Revisa la documentación en `EJEMPLOS_USO.md`
2. Verifica los comentarios en el código
3. Consulta con tu instructor SENA

---

**¡Gracias por usar esta API! 🚀**
