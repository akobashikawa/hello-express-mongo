const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks');

router.get('/', tasksController.getAll);
router.post('/', tasksController.add);
router.delete('/:id', tasksController.delete);
router.put('/:id', tasksController.update);

module.exports = router;
