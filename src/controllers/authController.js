/**
 * ============================================
 * CONTROLADOR DE AUTENTICACIÓN
 * ============================================
 * 
 * Maneja la lógica de negocio para las operaciones de autenticación:
 * - Registro de usuarios
 * - Inicio de sesión
 * - Listado de usuarios
 * 
 * Los controladores reciben las peticiones HTTP, procesan la información
 * y envían las respuestas apropiadas.
 */

// ============================================
// IMPORTACIONES
// ============================================

// Importar servicio de autenticación que contiene la lógica de negocio
const authService = require('../services/authService');

// ============================================
// CONTROLADORES
// ============================================

/**
 * Registrar un nuevo usuario
 * 
 * Función controladora que maneja la petición de registro de usuario.
 * Valida que el usuario no exista y lo registra en el sistema.
 * 
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} req.body - Cuerpo de la petición
 * @param {string} req.body.usuario - Nombre de usuario
 * @param {string} req.body.contraseña - Contraseña del usuario
 * @param {Object} res - Objeto de respuesta HTTP
 * 
 * @returns {Object} JSON con resultado del registro
 * 
 * Códigos de estado:
 * - 201: Usuario creado exitosamente
 * - 400: Error en validación o usuario ya existe
 * - 500: Error interno del servidor
 */
const registrarUsuario = async (req, res) => {
    try {
        // Extraer datos del cuerpo de la petición
        const { usuario, contraseña } = req.body;

        // Llamar al servicio para registrar el usuario
        const resultado = await authService.registrar(usuario, contraseña);

        // Si el registro fue exitoso, enviar respuesta con código 201 (Created)
        if (resultado.exito) {
            return res.status(201).json({
                mensaje: resultado.mensaje,
                usuario: resultado.usuario,
                timestamp: new Date().toISOString()
            });
        } else {
            // Si hubo error (ej: usuario ya existe), enviar código 400 (Bad Request)
            return res.status(400).json({
                error: resultado.mensaje
            });
        }
    } catch (error) {
        // Capturar cualquier error inesperado
        console.error('❌ Error en registrarUsuario:', error);
        return res.status(500).json({
            error: 'Error al registrar usuario',
            detalle: error.message
        });
    }
};

/**
 * Iniciar sesión (Login)
 * 
 * Función controladora que maneja la autenticación de usuarios.
 * Verifica las credenciales y retorna resultado de autenticación.
 * 
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} req.body - Cuerpo de la petición
 * @param {string} req.body.usuario - Nombre de usuario
 * @param {string} req.body.contraseña - Contraseña del usuario
 * @param {Object} res - Objeto de respuesta HTTP
 * 
 * @returns {Object} JSON con resultado de autenticación
 * 
 * Códigos de estado:
 * - 200: Autenticación exitosa
 * - 401: Credenciales incorrectas
 * - 500: Error interno del servidor
 */
const iniciarSesion = async (req, res) => {
    try {
        // Extraer credenciales del cuerpo de la petición
        const { usuario, contraseña } = req.body;

        // Llamar al servicio para autenticar
        const resultado = await authService.autenticar(usuario, contraseña);

        // Si la autenticación fue exitosa
        if (resultado.exito) {
            return res.status(200).json({
                mensaje: 'Autenticación satisfactoria', // Mensaje requerido por la evidencia
                usuario: resultado.usuario,
                timestamp: new Date().toISOString()
            });
        } else {
            // Si las credenciales son incorrectas, enviar código 401 (Unauthorized)
            return res.status(401).json({
                error: 'Credenciales incorrectas',
                mensaje: resultado.mensaje
            });
        }
    } catch (error) {
        // Capturar cualquier error inesperado
        console.error('❌ Error en iniciarSesion:', error);
        return res.status(500).json({
            error: 'Error al iniciar sesión',
            detalle: error.message
        });
    }
};

/**
 * Listar usuarios registrados
 * 
 * Función de utilidad para ver todos los usuarios registrados en el sistema.
 * 
 * ⚠️ ADVERTENCIA: Esta función es solo para propósitos de prueba.
 * En un sistema real, NO se debe exponer la lista de usuarios.
 * 
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * 
 * @returns {Object} JSON con lista de usuarios
 * 
 * Códigos de estado:
 * - 200: Lista retornada exitosamente
 * - 500: Error interno del servidor
 */
const listarUsuarios = async (req, res) => {
    try {
        // Obtener lista de usuarios desde el servicio
        const usuarios = await authService.obtenerUsuarios();

        // Retornar lista con código 200 (OK)
        return res.status(200).json({
            total: usuarios.length,
            usuarios: usuarios,
            nota: 'Esta ruta es solo para propósitos de prueba'
        });
    } catch (error) {
        // Capturar cualquier error inesperado
        console.error('❌ Error en listarUsuarios:', error);
        return res.status(500).json({
            error: 'Error al obtener usuarios',
            detalle: error.message
        });
    }
};

// ============================================
// EXPORTAR CONTROLADORES
// ============================================

/**
 * Exportar las funciones del controlador para ser usadas en las rutas
 */
module.exports = {
    registrarUsuario,
    iniciarSesion,
    listarUsuarios
};
