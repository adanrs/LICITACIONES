const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/login', usersController.login);

router.post('/create', usersController.createUser);


router.post('/', authMiddleware.authorize('create'), usersController.createUser);
router.get('/', authMiddleware.authorize('read'), usersController.getUsers);
router.put('/:id', authMiddleware.authorize('update'), usersController.updateUser);
router.delete('/:id', authMiddleware.authorize('delete'), usersController.deleteUser);
module.exports = router;