const express = require('express');
const passportMid = require('../auth/passport');

const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', passportMid.isAuthenticated, usersController.getAll);
router.post('/', usersController.add);
router.delete('/:id', usersController.delete);
router.put('/:id', usersController.update);

router.post('/login', passportMid.authenticate, usersController.authorized);
router.get('/authorized', usersController.authorized);
router.get('/unauthorized', usersController.unauthorized);
router.get('/logout', passportMid.logout);

module.exports = router;