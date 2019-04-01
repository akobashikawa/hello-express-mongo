const express = require('express');
const passportMid = require('../auth/passport');

const router = express.Router();
const tasksController = require('../controllers/tasks');

router.get('/', passportMid.isAuthenticated, tasksController.getAll);
router.post('/', passportMid.isAuthenticated, tasksController.add);
router.delete('/:id', passportMid.isAuthenticated, tasksController.delete);
router.put('/:id', passportMid.isAuthenticated, tasksController.update);

module.exports = router;
