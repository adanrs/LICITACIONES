const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authenticate = require('../middleware/authenticate'); // Importa el middleware de autenticación
const licitacionesController = require('../controllers/licitacionesController');

// Aplicar primero el middleware de autenticación
router.use(authenticate);

// Ahora 'req.user' estará disponible para los siguientes middlewares
router.get('/', authMiddleware.authorize('read'), licitacionesController.getLicitaciones);

module.exports = router;
