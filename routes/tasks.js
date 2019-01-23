const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks');

router.get('/', tasksController.getAll);
router.post('/', tasksController.add);

module.exports = router;
