/**
 * ============================================
 * APLICACIÓN PRINCIPAL - API DE AUTENTICACIÓN
 * ============================================
 * 
 * Archivo principal que configura y ejecuta el servidor Express.
 * 
 * Funcionalidades:
 * - Configuración del servidor web
 * - Middlewares globales
 * - Rutas de la API
 * - Manejo de errores
 * 
 * Autor: Juan Pablo Giraldo Echavarria
 * Fecha: 2026-04-19
 * Evidencia: GA7-220501096-AA5-EV01
 */

// ============================================
// IMPORTACIÓN DE DEPENDENCIAS
// ============================================

// Framework web para Node.js
const express = require('express');

// Manejo de variables de entorno
require('dotenv').config();

// Importar rutas de autenticación
const authRoutes = require('./routes/authRoutes');

// ============================================
// CONFIGURACIÓN DE LA APLICACIÓN
// ============================================

// Crear instancia de Express
const app = express();

// Definir puerto desde variables de entorno o usar 3000 por defecto
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARES GLOBALES
// ============================================

/**
 * Middleware para parsear JSON en las peticiones
 * Permite que Express entienda el cuerpo de las peticiones en formato JSON
 */
app.use(express.json());

/**
 * Middleware para parsear datos de formularios URL-encoded
 * Útil para peticiones desde formularios HTML
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Middleware para agregar headers de CORS (Cross-Origin Resource Sharing)
 * Permite que la API sea consumida desde otros dominios
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// ============================================
// RUTA PRINCIPAL DE BIENVENIDA
// ============================================

/**
 * GET /
 * 
 * Endpoint de bienvenida de la API
 * 
 * @returns {Object} Mensaje de bienvenida con información de la API
 */
app.get('/', (req, res) => {
    res.json({
        mensaje: '🚀 API de Registro y Autenticación - SENA',
        version: '1.0.0',
        evidencia: 'GA7-220501096-AA5-EV01',
        endpoints: {
            registro: 'POST /api/auth/registro',
            login: 'POST /api/auth/login',
            usuarios: 'GET /api/auth/usuarios'
        },
        documentacion: 'Consulta el archivo README.md para más información'
    });
});

// ============================================
// RUTAS DE LA API
// ============================================

/**
 * Montar las rutas de autenticación en /api/auth
 * Todas las rutas de authRoutes serán accesibles bajo este prefijo
 */
app.use('/api/auth', authRoutes);

// ============================================
// MANEJO DE RUTAS NO ENCONTRADAS (404)
// ============================================

/**
 * Middleware para manejar rutas que no existen
 * Se ejecuta cuando ninguna ruta anterior coincide con la petición
 */
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        mensaje: `La ruta ${req.method} ${req.url} no existe en esta API`,
        sugerencia: 'Consulta GET / para ver los endpoints disponibles'
    });
});

// ============================================
// MANEJO GLOBAL DE ERRORES
// ============================================

/**
 * Middleware de manejo de errores
 * Captura cualquier error que ocurra en la aplicación
 * 
 * @param {Error} err - Objeto de error
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Siguiente middleware
 */
app.use((err, req, res, next) => {
    // Log del error en consola para debugging
    console.error('❌ Error:', err.message);
    console.error(err.stack);

    // Responder con error 500 (Error interno del servidor)
    res.status(500).json({
        error: 'Error interno del servidor',
        mensaje: err.message,
        timestamp: new Date().toISOString()
    });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

/**
 * Iniciar el servidor en el puerto especificado
 * Muestra mensaje de confirmación en consola
 */
app.listen(PORT, () => {
    console.log('========================================');
    console.log('🚀 SERVIDOR INICIADO CORRECTAMENTE');
    console.log('========================================');
    console.log(`📡 Puerto: ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`📚 Endpoints disponibles:`);
    console.log(`   - GET  http://localhost:${PORT}/`);
    console.log(`   - POST http://localhost:${PORT}/api/auth/registro`);
    console.log(`   - POST http://localhost:${PORT}/api/auth/login`);
    console.log(`   - GET  http://localhost:${PORT}/api/auth/usuarios`);
    console.log('========================================');
    console.log('⏸️  Presiona Ctrl+C para detener el servidor');
    console.log('========================================\n');
});

// Exportar la aplicación para testing (opcional)
module.exports = app;
