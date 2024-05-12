const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authenticate = require('../middleware/authenticate'); // Importa el middleware de autenticación
const licitacionesController = require('../controllers/LicitacionesController'); // Asegúrate de que el nombre del archivo y la exportación sean correctos

// Aplicar primero el middleware de autenticación
router.use(authenticate);

// Ahora 'req.user' estará disponible para los siguientes middlewares
router.get('/', authMiddleware.authorize('read'), licitacionesController.getLicitaciones);
router.post('/', licitacionesController.createLicitacion); // Corregido a licitacionesController
router.get('/:id', licitacionesController.getLicitacion); // Corregido a licitacionesController
router.delete('/:id', licitacionesController.deleteLicitacion); // Corregido a licitacionesController

module.exports = router;
