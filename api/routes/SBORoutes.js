const express = require('express');
const router = express.Router();
const sboController = require('../controllers/SBOController');
const authenticate = require('../middleware/authenticate');  // Asegúrate de que este es el nombre correcto y la ruta de tu middleware

// Aplicar middleware de autenticación a todas las rutas de vendedores
router.use(authenticate);

router.get('/items', sboController.getItems);
router.get('/items/:itemCode', sboController.getItem);
router.get('/clients-suppliers', sboController.getClientsAndSuppliers);
router.get('/clients-suppliers/:clientCode', sboController.getClient);
router.get('/search/items', sboController.searchItems);
router.get('/search/clients', sboController.searchClients);
 
 
// Ruta para buscar artículos por texto
router.get('/search/items-by-text', sboController.searchItemsByText);
module.exports = router;
