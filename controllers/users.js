const usersService = require('../services/users');

exports.getAll = async (req, res) => {
    console.log('getAll');
    console.log('session', req.session);
    console.log('user', req.user);
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

exports.login = async (req, res) => {
    try {
        const data = req.body;
        const result = await usersService.login(data);
        res.json(result);
    } catch (error) {
        res.status(403).json({
            message: error.message,
        });
    }
};

exports.authorized = (req, res) => {
    console.log('authorized');
    console.log('session', req.session);
    console.log('user', req.user);
    return res.json(req.user);
};

exports.unauthorized = (req, res) => {
    console.log('unauthorized');
    console.log('session', req.session);
    console.log('user', req.user);
    return res.status(403).json(req.user);
};