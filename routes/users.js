const express = require('express');
const passportMid = require('../auth/passport');

const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', passportMid.isAuthenticated, usersController.getAll);
router.post('/', passportMid.isAuthenticated, usersController.add);
router.delete('/:id', passportMid.isAuthenticated, usersController.delete);
router.put('/:id', passportMid.isAuthenticated, usersController.update);

router.post('/login', passportMid.authenticate, usersController.authorized);
router.post('/logout', usersController.logout);
router.get('/authorized', usersController.authorized);
router.get('/unauthorized', usersController.unauthorized);
router.get('/logout', passportMid.logout);

module.exports = router;