/**
 * ============================================
 * SERVICIO DE AUTENTICACIÓN
 * ============================================
 * 
 * Contiene la lógica de negocio para autenticación:
 * - Almacenamiento de usuarios (en memoria)
 * - Hashing de contraseñas
 * - Verificación de credenciales
 * 
 * NOTA: En este proyecto educativo, los usuarios se almacenan en memoria (un Map).
 * En un sistema real, se usaría una base de datos (MySQL, MongoDB, PostgreSQL, etc.)
 */

// ============================================
// IMPORTACIONES
// ============================================

// Librería para hashear contraseñas de forma segura
const bcrypt = require('bcrypt');

// ============================================
// ALMACENAMIENTO DE DATOS
// ============================================

/**
 * Map para almacenar usuarios en memoria
 * 
 * Estructura: Map<nombreUsuario, objetoUsuario>
 * 
 * Ejemplo:
 * {
 *   "usuario1" => {
 *     usuario: "usuario1",
 *     contraseñaHash: "$2b$10$...",
 *     fechaRegistro: "2026-04-19T10:30:00.000Z"
 *   }
 * }
 * 
 * ⚠️ IMPORTANTE: Los datos se pierden al reiniciar el servidor
 * porque están en memoria, no en una base de datos persistente.
 */
const usuariosDB = new Map();

// ============================================
// CONFIGURACIÓN
// ============================================

/**
 * Número de rondas de salt para bcrypt
 * Más rondas = más seguro pero más lento
 * 10 es un valor balanceado para desarrollo
 */
const SALT_ROUNDS = 10;

// ============================================
// FUNCIONES DEL SERVICIO
// ============================================

/**
 * Registrar un nuevo usuario
 * 
 * Verifica que el usuario no exista, hashea la contraseña
 * y almacena el usuario en el sistema.
 * 
 * @param {string} usuario - Nombre de usuario a registrar
 * @param {string} contraseña - Contraseña en texto plano
 * 
 * @returns {Object} Objeto con resultado de la operación
 * @returns {boolean} exito - Indica si el registro fue exitoso
 * @returns {string} mensaje - Mensaje descriptivo del resultado
 * @returns {string} usuario - Nombre de usuario registrado (si fue exitoso)
 * 
 * Ejemplo de retorno exitoso:
 * {
 *   exito: true,
 *   mensaje: "Usuario registrado exitosamente",
 *   usuario: "juan123"
 * }
 * 
 * Ejemplo de retorno con error:
 * {
 *   exito: false,
 *   mensaje: "El usuario ya existe"
 * }
 */
const registrar = async (usuario, contraseña) => {
    try {
        // Verificar si el usuario ya existe en el Map
        if (usuariosDB.has(usuario)) {
            return {
                exito: false,
                mensaje: 'El usuario ya existe'
            };
        }

        // Hashear la contraseña para almacenarla de forma segura
        // NUNCA se debe almacenar contraseñas en texto plano
        const contraseñaHash = await bcrypt.hash(contraseña, SALT_ROUNDS);

        // Crear objeto de usuario con sus datos
        const nuevoUsuario = {
            usuario: usuario,
            contraseñaHash: contraseñaHash,
            fechaRegistro: new Date().toISOString()
        };

        // Almacenar el usuario en el Map
        usuariosDB.set(usuario, nuevoUsuario);

        // Log para debugging (en producción se usaría un logger profesional)
        console.log(`✅ Usuario registrado: ${usuario}`);

        // Retornar resultado exitoso
        return {
            exito: true,
            mensaje: 'Usuario registrado exitosamente',
            usuario: usuario
        };

    } catch (error) {
        // Capturar cualquier error durante el registro
        console.error('❌ Error al registrar usuario:', error);
        return {
            exito: false,
            mensaje: 'Error al procesar el registro'
        };
    }
};

/**
 * Autenticar un usuario (Login)
 * 
 * Verifica que el usuario exista y que la contraseña sea correcta
 * comparando con el hash almacenado.
 * 
 * @param {string} usuario - Nombre de usuario
 * @param {string} contraseña - Contraseña en texto plano
 * 
 * @returns {Object} Objeto con resultado de la autenticación
 * @returns {boolean} exito - Indica si la autenticación fue exitosa
 * @returns {string} mensaje - Mensaje descriptivo del resultado
 * @returns {string} usuario - Nombre de usuario autenticado (si fue exitoso)
 * 
 * Ejemplo de retorno exitoso:
 * {
 *   exito: true,
 *   mensaje: "Autenticación exitosa",
 *   usuario: "juan123"
 * }
 * 
 * Ejemplo de retorno con error:
 * {
 *   exito: false,
 *   mensaje: "Usuario no encontrado"
 * }
 */
const autenticar = async (usuario, contraseña) => {
    try {
        // Buscar el usuario en el Map
        const usuarioEncontrado = usuariosDB.get(usuario);

        // Si el usuario no existe, retornar error
        if (!usuarioEncontrado) {
            console.log(`⚠️ Intento de login con usuario inexistente: ${usuario}`);
            return {
                exito: false,
                mensaje: 'Usuario no encontrado'
            };
        }

        // Comparar la contraseña proporcionada con el hash almacenado
        // bcrypt.compare() hace la comparación de forma segura
        const contraseñaValida = await bcrypt.compare(contraseña, usuarioEncontrado.contraseñaHash);

        // Si la contraseña no coincide
        if (!contraseñaValida) {
            console.log(`⚠️ Intento de login con contraseña incorrecta para: ${usuario}`);
            return {
                exito: false,
                mensaje: 'Contraseña incorrecta'
            };
        }

        // Si llegamos aquí, la autenticación fue exitosa
        console.log(`✅ Login exitoso: ${usuario}`);
        
        return {
            exito: true,
            mensaje: 'Autenticación exitosa',
            usuario: usuario
        };

    } catch (error) {
        // Capturar cualquier error durante la autenticación
        console.error('❌ Error al autenticar usuario:', error);
        return {
            exito: false,
            mensaje: 'Error al procesar la autenticación'
        };
    }
};

/**
 * Obtener lista de nombres de usuario registrados
 * 
 * Función de utilidad para obtener todos los usuarios del sistema.
 * NO retorna las contraseñas, solo los nombres de usuario.
 * 
 * ⚠️ ADVERTENCIA: Esta función es solo para propósitos de prueba.
 * En un sistema real, esta información debe estar protegida.
 * 
 * @returns {Array<string>} Array con nombres de usuarios registrados
 * 
 * Ejemplo de retorno:
 * ["usuario1", "usuario2", "usuario3"]
 */
const obtenerUsuarios = async () => {
    try {
        // Convertir las claves del Map (nombres de usuario) a un array
        return Array.from(usuariosDB.keys());
    } catch (error) {
        console.error('❌ Error al obtener usuarios:', error);
        return [];
    }
};

/**
 * Función de utilidad para limpiar la base de datos (solo para testing)
 * 
 * ⚠️ Esta función elimina todos los usuarios registrados.
 * Útil para resetear el sistema durante pruebas.
 */
const limpiarUsuarios = () => {
    usuariosDB.clear();
    console.log('🧹 Base de datos limpiada');
};

// ============================================
// EXPORTAR FUNCIONES
// ============================================

/**
 * Exportar las funciones del servicio para ser usadas en los controladores
 */
module.exports = {
    registrar,
    autenticar,
    obtenerUsuarios,
    limpiarUsuarios
};
