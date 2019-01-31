const express = require('express');
const passportService = require('../services/passport');

const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getAll);
router.post('/', usersController.add);
router.delete('/:id', usersController.delete);
router.put('/:id', usersController.update);

router.post('/login', passportService.authenticate, usersController.loginSuccess);

module.exports = router;