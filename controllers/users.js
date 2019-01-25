const usersService = require('../services/users');

exports.getAll = async (req, res) => {
    try {
        const result = await usersService.getAll();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.add = async (req, res) => {
    try {
        const data = req.body;
        const result = await usersService.add(data);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await usersService.delete(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await usersService.update(id, data);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};