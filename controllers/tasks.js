const tasksService = require('../services/tasks');

const controller = () => { };

controller.getAll = async (req, res) => {
    const tasks = await tasksService.getAll();
    res.json(tasks);
};

module.exports = controller;