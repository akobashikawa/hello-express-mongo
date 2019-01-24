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

controller.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await tasksService.delete(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

controller.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await tasksService.update(id, data);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = controller;