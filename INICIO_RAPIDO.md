# ⚡ INICIO RÁPIDO - 3 PASOS

## 📝 ANTES DE EMPEZAR

Verifica que tienes Node.js instalado:
```powershell
node --version
```

Si no está instalado, descárgalo desde: https://nodejs.org/

---

## 🚀 EJECUTAR EL PROYECTO

### Paso 1: Abrir Terminal en VS Code

Presiona: `Ctrl + Ñ` o ve a menú `Terminal > Nueva Terminal`

---

### Paso 2: Instalar Dependencias

```powershell
npm install
```

⏳ **Espera:** Este proceso tomará 10-30 segundos

✅ **Éxito:** Verás que se crea la carpeta `node_modules/`

---

### Paso 3: Ejecutar el Servidor

```powershell
npm start
```

✅ **Éxito:** Deberías ver:

```
========================================
🚀 SERVIDOR INICIADO CORRECTAMENTE
========================================
📡 Puerto: 3000
🌐 URL: http://localhost:3000
```

---

## 🧪 PROBAR LA API

### Opción 1: Navegador

Abre tu navegador y ve a:
```
http://localhost:3000
```

Deberías ver la información de bienvenida de la API.

---

### Opción 2: Thunder Client (Recomendado)

1. **Instalar extensión:**
   - En VS Code, ve a Extensiones (Ctrl+Shift+X)
   - Busca "Thunder Client"
   - Instala la extensión

2. **Crear petición de prueba:**
   - Abre Thunder Client (icono del rayo en la barra lateral)
   - Click en "New Request"
   - Configura:
     - Método: `POST`
     - URL: `http://localhost:3000/api/auth/registro`
     - Body: Selecciona "JSON"
     - Contenido:
       ```json
       {
         "usuario": "prueba_sena",
         "contraseña": "segura2026"
       }
       ```
   - Click en "Send"

3. **Resultado esperado:**
   ```json
   {
     "mensaje": "Usuario registrado exitosamente",
     "usuario": "prueba_sena",
     "timestamp": "..."
   }
   ```

---

### Opción 3: cURL (Línea de Comandos)

Abre una nueva terminal y ejecuta:

```powershell
curl http://localhost:3000/
```

---

## 📚 EJEMPLOS COMPLETOS

Para ver todos los ejemplos de uso, consulta:
- **Archivo:** `EJEMPLOS_USO.md`
- **Sección:** Flujo Completo de Prueba

---

## 🛑 DETENER EL SERVIDOR

En la terminal donde está corriendo el servidor, presiona:
```
Ctrl + C
```

---

## ❓ PROBLEMAS COMUNES

### Error: "Cannot find module 'express'"

**Solución:** Ejecuta `npm install` nuevamente

---

### Error: "Port 3000 is already in use"

**Opción 1:** Cierra el programa que está usando el puerto 3000

**Opción 2:** Cambia el puerto en el archivo `.env`:
```
PORT=3001
```

---

### El servidor no inicia

**Verifica que estás en el directorio correcto:**
```powershell
pwd
# Deberías estar en: d:\OneDrive\SENA\PROYECTOS\INICIO SESION
```

**Si no estás en el directorio correcto:**
```powershell
cd "d:\OneDrive\SENA\PROYECTOS\INICIO SESION"
```

---

## 📖 DOCUMENTACIÓN COMPLETA

Para instrucciones detalladas, consulta:

- **`README.md`** - Documentación principal
- **`EJEMPLOS_USO.md`** - Ejemplos de peticiones
- **`GUIA_COMMITS.md`** - Control de versiones
- **`RESUMEN_EVIDENCIA.md`** - Checklist de entrega

---

## ✅ SIGUIENTE PASO

Una vez que el servidor esté corriendo, sigue el **Flujo Completo de Prueba** en `EJEMPLOS_USO.md` para probar todas las funcionalidades.

---

**¡Listo para comenzar! 🎉**
