# 📝 Ejemplos de Uso de la API

Este documento contiene ejemplos prácticos de cómo usar cada endpoint de la API.

---

## 🔧 Herramientas para Probar la API

Puedes usar cualquiera de estas herramientas:

1. **Thunder Client** (Extensión de VS Code) - Recomendado
2. **Postman** - Cliente de APIs profesional
3. **cURL** - Línea de comandos
4. **Navegador** - Solo para peticiones GET

---

## 📍 Base URL

```
http://localhost:3000
```

**IMPORTANTE:** El servidor debe estar en ejecución (`npm start` o `npm run dev`)

---

## 1️⃣ Endpoint: Información de la API

### GET /

**Descripción:** Obtiene información general de la API

### Ejemplo con Thunder Client / Postman

```
Método: GET
URL: http://localhost:3000/
Headers: (ninguno necesario)
Body: (ninguno)
```

### Ejemplo con cURL (PowerShell)

```powershell
curl http://localhost:3000/
```

### Respuesta (200 OK)

```json
{
  "mensaje": "🚀 API de Registro y Autenticación - SENA",
  "version": "1.0.0",
  "evidencia": "GA7-220501096-AA5-EV01",
  "endpoints": {
    "registro": "POST /api/auth/registro",
    "login": "POST /api/auth/login",
    "usuarios": "GET /api/auth/usuarios"
  },
  "documentacion": "Consulta el archivo README.md para más información"
}
```

---

## 2️⃣ Endpoint: Registro de Usuario

### POST /api/auth/registro

**Descripción:** Registra un nuevo usuario en el sistema

### Ejemplo 1: Registro Exitoso

#### Thunder Client / Postman

```
Método: POST
URL: http://localhost:3000/api/auth/registro
Headers:
  Content-Type: application/json

Body (JSON):
{
  "usuario": "juan123",
  "contraseña": "segura123"
}
```

#### cURL (PowerShell)

```powershell
curl -X POST http://localhost:3000/api/auth/registro `
-H "Content-Type: application/json" `
-d '{\"usuario\":\"juan123\",\"contraseña\":\"segura123\"}'
```

#### Respuesta (201 Created)

```json
{
  "mensaje": "Usuario registrado exitosamente",
  "usuario": "juan123",
  "timestamp": "2026-04-19T10:30:15.234Z"
}
```

---

### Ejemplo 2: Usuario Ya Existe

#### Body (JSON)

```json
{
  "usuario": "juan123",
  "contraseña": "otra_contraseña"
}
```

#### Respuesta (400 Bad Request)

```json
{
  "error": "El usuario ya existe"
}
```

---

### Ejemplo 3: Datos Incompletos

#### Body (JSON)

```json
{
  "usuario": "maria456"
}
```

#### Respuesta (400 Bad Request)

```json
{
  "error": "Datos incompletos",
  "mensaje": "El campo \"contraseña\" es requerido"
}
```

---

### Ejemplo 4: Usuario Muy Corto

#### Body (JSON)

```json
{
  "usuario": "ab",
  "contraseña": "segura123"
}
```

#### Respuesta (400 Bad Request)

```json
{
  "error": "Formato de usuario inválido",
  "mensaje": "El usuario debe tener al menos 3 caracteres"
}
```

---

### Ejemplo 5: Contraseña Muy Corta

#### Body (JSON)

```json
{
  "usuario": "pedro789",
  "contraseña": "12345"
}
```

#### Respuesta (400 Bad Request)

```json
{
  "error": "Formato de contraseña inválida",
  "mensaje": "La contraseña debe tener al menos 6 caracteres"
}
```

---

### Ejemplo 6: Usuario con Caracteres Inválidos

#### Body (JSON)

```json
{
  "usuario": "juan@123",
  "contraseña": "segura123"
}
```

#### Respuesta (400 Bad Request)

```json
{
  "error": "Formato de usuario inválido",
  "mensaje": "El usuario solo puede contener letras, números y guión bajo"
}
```

---

## 3️⃣ Endpoint: Inicio de Sesión (Login)

### POST /api/auth/login

**Descripción:** Autentica un usuario existente

### Ejemplo 1: Login Exitoso

#### Thunder Client / Postman

```
Método: POST
URL: http://localhost:3000/api/auth/login
Headers:
  Content-Type: application/json

Body (JSON):
{
  "usuario": "juan123",
  "contraseña": "segura123"
}
```

#### cURL (PowerShell)

```powershell
curl -X POST http://localhost:3000/api/auth/login `
-H "Content-Type: application/json" `
-d '{\"usuario\":\"juan123\",\"contraseña\":\"segura123\"}'
```

#### Respuesta (200 OK)

```json
{
  "mensaje": "Autenticación satisfactoria",
  "usuario": "juan123",
  "timestamp": "2026-04-19T10:35:22.456Z"
}
```

---

### Ejemplo 2: Contraseña Incorrecta

#### Body (JSON)

```json
{
  "usuario": "juan123",
  "contraseña": "contraseña_incorrecta"
}
```

#### Respuesta (401 Unauthorized)

```json
{
  "error": "Credenciales incorrectas",
  "mensaje": "Contraseña incorrecta"
}
```

---

### Ejemplo 3: Usuario No Existe

#### Body (JSON)

```json
{
  "usuario": "usuario_inexistente",
  "contraseña": "cualquier_cosa"
}
```

#### Respuesta (401 Unauthorized)

```json
{
  "error": "Credenciales incorrectas",
  "mensaje": "Usuario no encontrado"
}
```

---

### Ejemplo 4: Datos Incompletos

#### Body (JSON)

```json
{
  "usuario": "juan123"
}
```

#### Respuesta (400 Bad Request)

```json
{
  "error": "Datos incompletos",
  "mensaje": "Los campos \"usuario\" y \"contraseña\" son requeridos"
}
```

---

## 4️⃣ Endpoint: Listar Usuarios

### GET /api/auth/usuarios

**Descripción:** Obtiene lista de usuarios registrados (solo para pruebas)

### Ejemplo con Thunder Client / Postman

```
Método: GET
URL: http://localhost:3000/api/auth/usuarios
Headers: (ninguno necesario)
Body: (ninguno)
```

### Ejemplo con cURL (PowerShell)

```powershell
curl http://localhost:3000/api/auth/usuarios
```

### Respuesta (200 OK)

```json
{
  "total": 3,
  "usuarios": [
    "juan123",
    "maria456",
    "pedro789"
  ],
  "nota": "Esta ruta es solo para propósitos de prueba"
}
```

### Respuesta cuando no hay usuarios

```json
{
  "total": 0,
  "usuarios": [],
  "nota": "Esta ruta es solo para propósitos de prueba"
}
```

---

## 5️⃣ Endpoint: Ruta No Encontrada

### ANY /ruta/inexistente

**Descripción:** Cualquier ruta que no existe retorna un error 404

### Ejemplo

```
Método: GET
URL: http://localhost:3000/api/cualquier/cosa
```

### Respuesta (404 Not Found)

```json
{
  "error": "Ruta no encontrada",
  "mensaje": "La ruta GET /api/cualquier/cosa no existe en esta API",
  "sugerencia": "Consulta GET / para ver los endpoints disponibles"
}
```

---

## 🎬 Flujo Completo de Prueba

Sigue estos pasos para probar toda la funcionalidad:

### Paso 1: Verificar que la API está funcionando

```
GET http://localhost:3000/
```

Deberías recibir el mensaje de bienvenida.

---

### Paso 2: Verificar que no hay usuarios

```
GET http://localhost:3000/api/auth/usuarios
```

Deberías recibir una lista vacía.

---

### Paso 3: Registrar primer usuario

```
POST http://localhost:3000/api/auth/registro

Body:
{
  "usuario": "admin",
  "contraseña": "admin123"
}
```

Deberías recibir confirmación de registro exitoso.

---

### Paso 4: Intentar registrar el mismo usuario

```
POST http://localhost:3000/api/auth/registro

Body:
{
  "usuario": "admin",
  "contraseña": "otra_password"
}
```

Deberías recibir error "El usuario ya existe".

---

### Paso 5: Registrar segundo usuario

```
POST http://localhost:3000/api/auth/registro

Body:
{
  "usuario": "usuario2",
  "contraseña": "password456"
}
```

Deberías recibir confirmación de registro exitoso.

---

### Paso 6: Verificar usuarios registrados

```
GET http://localhost:3000/api/auth/usuarios
```

Deberías ver ambos usuarios: ["admin", "usuario2"]

---

### Paso 7: Login exitoso

```
POST http://localhost:3000/api/auth/login

Body:
{
  "usuario": "admin",
  "contraseña": "admin123"
}
```

Deberías recibir "Autenticación satisfactoria".

---

### Paso 8: Login con contraseña incorrecta

```
POST http://localhost:3000/api/auth/login

Body:
{
  "usuario": "admin",
  "contraseña": "incorrecta"
}
```

Deberías recibir error 401 "Credenciales incorrectas".

---

### Paso 9: Login con usuario inexistente

```
POST http://localhost:3000/api/auth/login

Body:
{
  "usuario": "noexiste",
  "contraseña": "cualquiera"
}
```

Deberías recibir error 401 "Usuario no encontrado".

---

## 📊 Tabla Resumen de Códigos HTTP

| Código | Nombre | Cuándo se usa |
|--------|--------|---------------|
| 200 | OK | Login exitoso, listar usuarios |
| 201 | Created | Registro exitoso |
| 400 | Bad Request | Datos inválidos o incompletos |
| 401 | Unauthorized | Credenciales incorrectas |
| 404 | Not Found | Ruta no existe |
| 500 | Internal Server Error | Error en el servidor |

---

## 🎯 Validaciones Implementadas

### Usuario

- ✅ No puede estar vacío
- ✅ Mínimo 3 caracteres
- ✅ Máximo 20 caracteres
- ✅ Solo letras, números y guión bajo (_)
- ✅ No puede empezar con número

### Contraseña

- ✅ No puede estar vacía
- ✅ Mínimo 6 caracteres
- ✅ No puede contener espacios

---

## 💡 Consejos para Pruebas

1. **Inicia con usuarios simples** para probar funcionalidad básica
2. **Prueba casos de error** para verificar validaciones
3. **Usa diferentes herramientas** para familiarizarte con cada una
4. **Revisa la consola del servidor** para ver los logs
5. **Guarda tus peticiones** en colecciones de Postman/Thunder Client

---

## 🔍 Verificar en la Consola del Servidor

Cuando ejecutas las peticiones, deberías ver mensajes en la consola:

```
✅ Usuario registrado: juan123
✓ Validación de login exitosa para: juan123
✅ Login exitoso: juan123
⚠️ Intento de login con contraseña incorrecta para: juan123
```

Estos logs te ayudan a entender qué está pasando internamente.

---

**¡Listo para probar! 🚀**

Comienza con el flujo completo y experimenta con diferentes casos.
