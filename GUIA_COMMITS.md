# 🔄 Guía de Commits Git - Control de Versiones

Esta guía muestra cómo usar Git de forma profesional para este proyecto.

---

## 📚 ¿Qué es Git?

**Git** es un sistema de control de versiones que permite:
- Guardar el historial de cambios del proyecto
- Trabajar en equipo sin conflictos
- Volver a versiones anteriores si algo sale mal
- Documentar el proceso de desarrollo

---

## 🎯 Estructura de un Commit Profesional

Un buen commit sigue esta estructura:

```
tipo: descripción corta

Descripción detallada (opcional)
```

### Tipos de Commit

| Tipo | Uso | Ejemplo |
|------|-----|---------|
| `feat` | Nueva funcionalidad | `feat: Agregar endpoint de registro` |
| `fix` | Corrección de bug | `fix: Validar contraseñas vacías` |
| `docs` | Documentación | `docs: Actualizar README` |
| `refactor` | Refactorización | `refactor: Mejorar estructura del servicio` |
| `test` | Pruebas | `test: Agregar tests de login` |
| `chore` | Tareas de mantenimiento | `chore: Actualizar dependencias` |
| `style` | Formato de código | `style: Formatear código con prettier` |

---

## 🚀 Secuencia de Commits para este Proyecto

A continuación, la secuencia profesional de commits para simular el desarrollo del proyecto:

### 1️⃣ Inicialización del Proyecto

```powershell
# Inicializar repositorio Git
git init

# Crear archivo package.json
# (ya existe en el proyecto)

# Primer commit
git add package.json
git commit -m "chore: Inicializar proyecto Node.js con dependencias"
```

**Descripción del commit:** Configuración inicial del proyecto con las dependencias necesarias (Express, bcrypt, dotenv).

---

### 2️⃣ Configuración Básica

```powershell
# Agregar .gitignore
git add .gitignore
git commit -m "chore: Configurar .gitignore para Node.js"

# Agregar .env.example
git add .env.example
git commit -m "chore: Agregar plantilla de variables de entorno"
```

---

### 3️⃣ Instalación de Dependencias

```powershell
# Instalar dependencias
npm install

# Confirmar instalación
git add package-lock.json
git commit -m "chore: Instalar dependencias del proyecto"
```

---

### 4️⃣ Estructura del Servidor

```powershell
# Crear app.js
git add src/app.js
git commit -m "feat: Configurar servidor Express con middlewares básicos"
```

**Descripción:** Servidor principal con configuración de Express, middlewares de JSON, CORS y manejo de errores.

---

### 5️⃣ Definición de Rutas

```powershell
# Crear rutas de autenticación
git add src/routes/authRoutes.js
git commit -m "feat: Definir rutas de autenticación (registro y login)"
```

**Descripción:** Endpoints para registro, login y listado de usuarios con documentación.

---

### 6️⃣ Middleware de Validación

```powershell
# Crear middleware de validación
git add src/middlewares/validationMiddleware.js
git commit -m "feat: Implementar validación de datos de entrada"
```

**Descripción:** Validación de formato de usuario y contraseña con reglas de negocio.

---

### 7️⃣ Servicio de Autenticación

```powershell
# Crear servicio de autenticación
git add src/services/authService.js
git commit -m "feat: Implementar servicio de autenticación con bcrypt"
```

**Descripción:** Lógica de negocio para registro, autenticación y gestión de usuarios con hash de contraseñas.

---

### 8️⃣ Controladores

```powershell
# Crear controladores
git add src/controllers/authController.js
git commit -m "feat: Implementar controladores de autenticación"
```

**Descripción:** Controladores para manejar peticiones HTTP de registro, login y listado.

---

### 9️⃣ Documentación

```powershell
# Agregar README
git add README.md
git commit -m "docs: Crear documentación principal del proyecto"

# Agregar ejemplos de uso
git add EJEMPLOS_USO.md
git commit -m "docs: Agregar ejemplos detallados de uso de la API"

# Agregar guía de commits
git add GUIA_COMMITS.md
git commit -m "docs: Agregar guía de commits y control de versiones"
```

---

### 🔟 Refinamientos (Opcionales)

```powershell
# Si corriges un bug
git add src/services/authService.js
git commit -m "fix: Corregir validación de usuario existente"

# Si mejoras código
git add src/controllers/authController.js
git commit -m "refactor: Mejorar manejo de errores en controladores"

# Si actualizas documentación
git add README.md
git commit -m "docs: Actualizar instrucciones de instalación"
```

---

## 📋 Secuencia Completa - Script Listo para Usar

Puedes ejecutar estos comandos en secuencia:

```powershell
# Paso 1: Inicializar Git
git init

# Paso 2: Primer commit (configuración)
git add package.json .gitignore .env.example
git commit -m "chore: Configuración inicial del proyecto"

# Paso 3: Instalar y confirmar dependencias
npm install
git add package-lock.json
git commit -m "chore: Instalar dependencias del proyecto"

# Paso 4: Servidor principal
git add src/app.js
git commit -m "feat: Configurar servidor Express con middlewares básicos"

# Paso 5: Rutas
git add src/routes/
git commit -m "feat: Definir rutas de autenticación (registro y login)"

# Paso 6: Validaciones
git add src/middlewares/
git commit -m "feat: Implementar validación de datos de entrada"

# Paso 7: Servicios
git add src/services/
git commit -m "feat: Implementar servicio de autenticación con bcrypt"

# Paso 8: Controladores
git add src/controllers/
git commit -m "feat: Implementar controladores de autenticación"

# Paso 9: Documentación
git add README.md EJEMPLOS_USO.md GUIA_COMMITS.md
git commit -m "docs: Crear documentación completa del proyecto"

# Paso 10: Commit final
git add .
git commit -m "chore: Proyecto API de autenticación completado"
```

---

## 🌿 Uso de Ramas (Branches)

Para proyectos más complejos, puedes usar ramas:

### Crear Rama para Nueva Funcionalidad

```powershell
# Crear y cambiar a nueva rama
git checkout -b feature/nueva-funcionalidad

# Hacer cambios y commit
git add .
git commit -m "feat: Implementar nueva funcionalidad"

# Volver a main
git checkout main

# Fusionar rama
git merge feature/nueva-funcionalidad
```

### Ramas Comunes

- `main` o `master` - Rama principal (código estable)
- `develop` - Rama de desarrollo
- `feature/nombre` - Nueva funcionalidad
- `fix/nombre` - Corrección de bugs
- `docs/nombre` - Documentación

---

## 📊 Ver Historial de Commits

```powershell
# Ver historial completo
git log

# Ver historial resumido
git log --oneline

# Ver últimos 5 commits
git log -5

# Ver cambios de un commit específico
git show <hash-del-commit>
```

---

## 🔍 Comandos Útiles de Git

### Ver Estado del Repositorio

```powershell
# Ver archivos modificados
git status

# Ver diferencias
git diff
```

### Deshacer Cambios

```powershell
# Deshacer cambios en archivo (antes de commit)
git checkout -- archivo.js

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer último commit (eliminar cambios)
git reset --hard HEAD~1
```

### Ignorar Archivos

El archivo `.gitignore` ya incluye:
- `node_modules/` - Dependencias
- `.env` - Variables de entorno sensibles
- Archivos de log
- Archivos temporales

---

## 🎓 Buenas Prácticas

### ✅ HACER

- Commits pequeños y frecuentes
- Mensajes descriptivos y claros
- Usar tipos de commit (feat, fix, docs...)
- Commit por cada funcionalidad completada
- Revisar cambios antes de commit (`git diff`)

### ❌ NO HACER

- Commits gigantes con muchos cambios
- Mensajes vagos como "arreglos" o "update"
- Incluir archivos sensibles (.env, contraseñas)
- Commit de código que no funciona
- Olvidar hacer commits frecuentes

---

## 📝 Plantilla de Mensaje de Commit

```
tipo: Descripción corta (máximo 50 caracteres)

Descripción detallada de los cambios realizados.
Explica el QUÉ y el POR QUÉ, no el CÓMO.

- Cambio 1
- Cambio 2
- Cambio 3
```

### Ejemplo Real

```
feat: Implementar validación de contraseñas

Agregar validación para contraseñas que verifica:
- Longitud mínima de 6 caracteres
- No contener espacios
- Retornar mensaje de error descriptivo

Esto mejora la seguridad del sistema y la experiencia
del usuario al recibir feedback claro.
```

---

## 🌐 Conectar con GitHub (Opcional)

Si quieres subir tu proyecto a GitHub:

```powershell
# 1. Crear repositorio en GitHub (web)

# 2. Conectar repositorio local con GitHub
git remote add origin https://github.com/tu-usuario/tu-repositorio.git

# 3. Subir código
git branch -M main
git push -u origin main

# 4. Posteriores actualizaciones
git push
```

---

## 📚 Recursos Adicionales

### Aprende más sobre Git

- **Documentación oficial:** https://git-scm.com/doc
- **Tutorial interactivo:** https://learngitbranching.js.org/
- **Cheat Sheet:** https://training.github.com/downloads/github-git-cheat-sheet/

### Convenciones de Commits

- **Conventional Commits:** https://www.conventionalcommits.org/
- **Semantic Versioning:** https://semver.org/

---

## 🎯 Para tu Evidencia SENA

Para demostrar uso de Git en tu evidencia:

1. **Captura de pantalla del historial:**
   ```powershell
   git log --oneline --graph --all
   ```

2. **Exportar historial a archivo:**
   ```powershell
   git log > historial-git.txt
   ```

3. **Mostrar estadísticas:**
   ```powershell
   git log --stat
   ```

---

## ✅ Checklist de Control de Versiones

- [ ] Repositorio Git inicializado
- [ ] `.gitignore` configurado
- [ ] Commits con mensajes descriptivos
- [ ] Uso de tipos de commit (feat, fix, docs...)
- [ ] Historial de commits coherente
- [ ] Sin archivos sensibles en el repositorio
- [ ] Documentación incluida en commits

---

**¡Control de versiones profesional logrado! 🎉**

Recuerda: Git es una herramienta esencial para cualquier desarrollador. Practicar con este proyecto te dará experiencia valiosa.
