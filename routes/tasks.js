const express = require('express');
const passportMid = require('../auth/passport');

const router = express.Router();
const tasksController = require('../controllers/tasks');

router.get('/', passportMid.isAuthenticated, tasksController.getAll);
router.post('/', tasksController.add);
router.delete('/:id', tasksController.delete);
router.put('/:id', tasksController.update);

module.exports = router;
