const express = require('express');
const passportMid = require('../auth/passport');

const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', passportMid.isAuthenticated, usersController.getAll);
router.post('/', passportMid.isAuthenticated, usersController.add);
router.delete('/:id', passportMid.isAuthenticated, usersController.delete);
router.put('/:id', passportMid.isAuthenticated, usersController.update);

module.exports = router;