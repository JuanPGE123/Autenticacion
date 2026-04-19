/**
 * ============================================
 * MIDDLEWARE DE VALIDACIÓN
 * ============================================
 * 
 * Contiene funciones middleware para validar los datos
 * de entrada antes de procesarlos en los controladores.
 * 
 * Validaciones implementadas:
 * - Presencia de campos requeridos
 * - Formato de datos
 * - Longitud mínima de contraseñas
 * - Caracteres permitidos
 * 
 * Los middlewares se ejecutan ANTES de los controladores
 * y pueden detener la ejecución si los datos no son válidos.
 */

// ============================================
// CONFIGURACIÓN DE VALIDACIÓN
// ============================================

/**
 * Longitud mínima permitida para contraseñas
 * Valor recomendado: 6-8 caracteres mínimo
 */
const MIN_PASSWORD_LENGTH = 6;

/**
 * Longitud mínima para nombres de usuario
 */
const MIN_USERNAME_LENGTH = 3;

/**
 * Longitud máxima para nombres de usuario
 */
const MAX_USERNAME_LENGTH = 20;

// ============================================
// FUNCIONES DE VALIDACIÓN
// ============================================

/**
 * Validar formato de nombre de usuario
 * 
 * Reglas:
 * - Solo letras, números y guión bajo
 * - Entre 3 y 20 caracteres
 * - No puede empezar con número
 * 
 * @param {string} usuario - Nombre de usuario a validar
 * @returns {Object} Objeto con resultado de validación
 * @returns {boolean} valido - Indica si el usuario es válido
 * @returns {string} mensaje - Mensaje de error si no es válido
 */
const validarFormatoUsuario = (usuario) => {
    // Verificar longitud
    if (usuario.length < MIN_USERNAME_LENGTH) {
        return {
            valido: false,
            mensaje: `El usuario debe tener al menos ${MIN_USERNAME_LENGTH} caracteres`
        };
    }

    if (usuario.length > MAX_USERNAME_LENGTH) {
        return {
            valido: false,
            mensaje: `El usuario no puede tener más de ${MAX_USERNAME_LENGTH} caracteres`
        };
    }

    // Verificar que solo contenga caracteres permitidos (letras, números, guión bajo)
    const regexCaracteres = /^[a-zA-Z0-9_]+$/;
    if (!regexCaracteres.test(usuario)) {
        return {
            valido: false,
            mensaje: 'El usuario solo puede contener letras, números y guión bajo'
        };
    }

    // Verificar que no empiece con número
    if (/^[0-9]/.test(usuario)) {
        return {
            valido: false,
            mensaje: 'El usuario no puede comenzar con un número'
        };
    }

    return { valido: true };
};

/**
 * Validar formato de contraseña
 * 
 * Reglas:
 * - Mínimo 6 caracteres
 * - No puede contener espacios
 * 
 * @param {string} contraseña - Contraseña a validar
 * @returns {Object} Objeto con resultado de validación
 * @returns {boolean} valido - Indica si la contraseña es válida
 * @returns {string} mensaje - Mensaje de error si no es válida
 */
const validarFormatoContraseña = (contraseña) => {
    // Verificar longitud mínima
    if (contraseña.length < MIN_PASSWORD_LENGTH) {
        return {
            valido: false,
            mensaje: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`
        };
    }

    // Verificar que no contenga espacios
    if (/\s/.test(contraseña)) {
        return {
            valido: false,
            mensaje: 'La contraseña no puede contener espacios'
        };
    }

    return { valido: true };
};

// ============================================
// MIDDLEWARES
// ============================================

/**
 * Middleware para validar datos de registro
 * 
 * Verifica que:
 * - El campo 'usuario' esté presente y sea válido
 * - El campo 'contraseña' esté presente y sea válido
 * 
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware/controlador
 * 
 * Si la validación falla:
 * - Envía una respuesta 400 (Bad Request) con el error
 * - NO llama a next(), deteniendo la ejecución
 * 
 * Si la validación es exitosa:
 * - Llama a next() para continuar al controlador
 */
const validarRegistro = (req, res, next) => {
    // Extraer datos del cuerpo de la petición
    const { usuario, contraseña } = req.body;

    // ====================================
    // VALIDAR PRESENCIA DE CAMPOS
    // ====================================

    // Verificar que el campo 'usuario' esté presente
    if (!usuario || usuario.trim() === '') {
        return res.status(400).json({
            error: 'Datos incompletos',
            mensaje: 'El campo "usuario" es requerido'
        });
    }

    // Verificar que el campo 'contraseña' esté presente
    if (!contraseña || contraseña.trim() === '') {
        return res.status(400).json({
            error: 'Datos incompletos',
            mensaje: 'El campo "contraseña" es requerido'
        });
    }

    // ====================================
    // VALIDAR FORMATO DE USUARIO
    // ====================================

    const validacionUsuario = validarFormatoUsuario(usuario.trim());
    if (!validacionUsuario.valido) {
        return res.status(400).json({
            error: 'Formato de usuario inválido',
            mensaje: validacionUsuario.mensaje
        });
    }

    // ====================================
    // VALIDAR FORMATO DE CONTRASEÑA
    // ====================================

    const validacionContraseña = validarFormatoContraseña(contraseña);
    if (!validacionContraseña.valido) {
        return res.status(400).json({
            error: 'Formato de contraseña inválido',
            mensaje: validacionContraseña.mensaje
        });
    }

    // ====================================
    // SI TODO ES VÁLIDO
    // ====================================

    // Log de validación exitosa
    console.log(`✓ Validación de registro exitosa para: ${usuario}`);

    // Continuar al siguiente middleware o controlador
    next();
};

/**
 * Middleware para validar datos de login
 * 
 * Verifica que:
 * - El campo 'usuario' esté presente
 * - El campo 'contraseña' esté presente
 * 
 * Nota: No validamos formato completo aquí porque queremos
 * dar feedback específico del login (usuario no existe vs contraseña incorrecta)
 * 
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware/controlador
 */
const validarLogin = (req, res, next) => {
    // Extraer credenciales del cuerpo de la petición
    const { usuario, contraseña } = req.body;

    // Verificar que ambos campos estén presentes
    if (!usuario || !contraseña) {
        return res.status(400).json({
            error: 'Datos incompletos',
            mensaje: 'Los campos "usuario" y "contraseña" son requeridos'
        });
    }

    // Verificar que no sean strings vacíos
    if (usuario.trim() === '' || contraseña.trim() === '') {
        return res.status(400).json({
            error: 'Datos inválidos',
            mensaje: 'El usuario y la contraseña no pueden estar vacíos'
        });
    }

    // Log de validación exitosa
    console.log(`✓ Validación de login exitosa para: ${usuario}`);

    // Continuar al controlador
    next();
};

// ============================================
// EXPORTAR MIDDLEWARES
// ============================================

/**
 * Exportar funciones de validación para ser usadas en las rutas
 */
module.exports = {
    validarRegistro,
    validarLogin
};
