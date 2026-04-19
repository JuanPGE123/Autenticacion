/**
 * ============================================
 * RUTAS DE AUTENTICACIÓN
 * ============================================
 * 
 * Define todas las rutas relacionadas con autenticación:
 * - Registro de usuarios
 * - Inicio de sesión (login)
 * - Listado de usuarios (para pruebas)
 * 
 * Cada ruta está conectada con su controlador correspondiente
 * y puede incluir middlewares de validación.
 */

// ============================================
// IMPORTACIONES
// ============================================

const express = require('express');
const router = express.Router();

// Importar controladores de autenticación
const authController = require('../controllers/authController');

// Importar middlewares de validación
const { validarRegistro, validarLogin } = require('../middlewares/validationMiddleware');

// ============================================
// DEFINICIÓN DE RUTAS
// ============================================

/**
 * POST /api/auth/registro
 * 
 * Ruta para registrar un nuevo usuario en el sistema
 * 
 * Flujo:
 * 1. Recibe datos del usuario (usuario, contraseña)
 * 2. Valida los datos mediante middleware
 * 3. Ejecuta el controlador de registro
 * 
 * Body esperado:
 * {
 *   "usuario": "nombre_usuario",
 *   "contraseña": "contraseña_segura"
 * }
 * 
 * Respuesta exitosa (201):
 * {
 *   "mensaje": "Usuario registrado exitosamente",
 *   "usuario": "nombre_usuario"
 * }
 * 
 * Respuesta de error (400):
 * {
 *   "error": "El usuario ya existe"
 * }
 */
router.post('/registro', validarRegistro, authController.registrarUsuario);

/**
 * POST /api/auth/login
 * 
 * Ruta para autenticar un usuario existente
 * 
 * Flujo:
 * 1. Recibe credenciales del usuario
 * 2. Valida formato de datos
 * 3. Verifica credenciales en el controlador
 * 
 * Body esperado:
 * {
 *   "usuario": "nombre_usuario",
 *   "contraseña": "contraseña_segura"
 * }
 * 
 * Respuesta exitosa (200):
 * {
 *   "mensaje": "Autenticación satisfactoria",
 *   "usuario": "nombre_usuario"
 * }
 * 
 * Respuesta de error (401):
 * {
 *   "error": "Credenciales incorrectas"
 * }
 */
router.post('/login', validarLogin, authController.iniciarSesion);

/**
 * GET /api/auth/usuarios
 * 
 * Ruta de utilidad para listar usuarios registrados
 * 
 * NOTA: Esta ruta es solo para propósitos de prueba y demostración.
 * En un sistema de producción, esta información NO debería ser pública.
 * 
 * Respuesta (200):
 * {
 *   "total": 2,
 *   "usuarios": ["usuario1", "usuario2"]
 * }
 */
router.get('/usuarios', authController.listarUsuarios);

// ============================================
// EXPORTAR ROUTER
// ============================================

/**
 * Exportar el router para ser usado en app.js
 */
module.exports = router;
