const usersService = require('../services/users');

exports.getAll = async (req, res) => {
    console.log('getAll');
    console.log('req.session', req.session);
    console.log('req.user', req.user);
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
    console.log('usersController login');
    console.log('req.session', req.session);
    console.log('req.user', req.user);
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

exports.logout = async (req, res) => {
    console.log('usersController logout');
    console.log('req.user', req.user);
    try {
        // we need to clear both session and passport logged user
        await req.session.destroy();
        await req.logout();
        console.log('after session destroy');
        console.log('req.session', req.session);
        console.log('req.user', req.user);
        res.json({
            message: 'logged out'
        });
    } catch (error) {
        res.status(403).json({
            message: error.message,
        });
    }
};

exports.authorized = (req, res) => {
    console.log('usersController authorized');
    console.log('req.session', req.session);
    console.log('req.user', req.user);
    return res.json(req.user);
};

exports.unauthorized = (req, res) => {
    console.log('usersController unauthorized');
    console.log('req.session', req.session);
    console.log('req.user', req.user);
    return res.status(403).json(req.user);
};

exports.session = (req, res) => {
    console.log('usersController session');
    console.log('req.session', req.session);
    console.log('req.user', req.user);
    const result = {};
    if (req.session.views) {
        req.session.views++;
    } else {
        req.session.views = 1;
    }
    result.views = req.session.views;
    result.expiresIn = req.session.cookie._expires;
    result.user = req.user;
    return res.json(result);
};