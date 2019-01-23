const tasksService = require('../services/tasks');

const controller = () => { };

controller.getAll = async (req, res) => {
    try {
        const result = await tasksService.getAll();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

controller.add = async (req, res) => {
    try {
        const data = req.body;
        const result = await tasksService.add(data);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = controller;