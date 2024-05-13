const express = require('express');
const router = express.Router();
const vendedorController = require('../controllers/VendedorController');
const authenticate = require('../middleware/authenticate');  // Asegúrate de que este es el nombre correcto y la ruta de tu middleware

// Aplicar middleware de autenticación a todas las rutas de vendedores
router.use(authenticate);

router.get('/', vendedorController.getVendedores);
router.get('/:slpCode', vendedorController.getVendedor);

module.exports = router;