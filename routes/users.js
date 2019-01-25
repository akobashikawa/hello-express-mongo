const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getAll);
router.post('/', usersController.add);
router.delete('/:id', usersController.delete);
router.put('/:id', usersController.update);

module.exports = router;