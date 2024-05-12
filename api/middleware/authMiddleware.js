const db = require('../config/db'); // Importa la configuración de la base de datos

// Función auxiliar para verificar los permisos en la base de datos
 
const checkPermissions = async (req, res, next, action) => {
    let connection;
    try {
        const { roles } = req.user;
        console.log('Roles:', roles);
        connection = await db.connect();  // Establece conexión
        const query = 'SELECT Permissions FROM APPS_EXTERNAS.Roles WHERE ROLEID = ?';
        const results = await connection.exec(query, [roles]);

        console.log('Database result:', results[0]);

        if (results.length > 0 && results[0].PERMISSIONS) {
            const permissions = results[0].PERMISSIONS.split(',');
            if (permissions.includes(action)) {
                next(); // El usuario tiene permiso
            } else {
                res.status(403).send({ message: 'Acceso Denegado: No tienes permiso para realizar esta acción' });
            }
        } else {
            res.status(404).send({ message: 'Rol no encontrado o permisos no definidos' });
        }
    } catch (error) {
        console.error('Database access error in authMiddleware:', error);
        res.status(500).send({ message: 'Error interno del servidor' });
    } finally {
        if (connection) {
            console.log("Connection released back to the pool.");
            await db.disconnect();  // Libera la conexión de manera segura
        }
    }
};



// Factory function para generar middleware específico de acción
exports.authorize = (action) => {
    return (req, res, next) => checkPermissions(req, res, next, action);
};
