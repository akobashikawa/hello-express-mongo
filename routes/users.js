const express = require('express');
const passportMid = require('../auth/passport');

const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getAll);
router.post('/', usersController.add);
router.delete('/:id', usersController.delete);
router.put('/:id', usersController.update);

router.post('/login', passportMid.authenticate, usersController.loginSuccess);
router.get('/unauthorized', usersController.unauthorized);

module.exports = router;