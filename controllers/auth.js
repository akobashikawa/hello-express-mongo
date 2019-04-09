const usersService = require('../services/users');

exports.login = async (req, res) => {
    console.log('authController login');
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
    console.log('authController logout');
    try {
        // actually, nothing to do, cause no session at backend level
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
    console.log('authController authorized');
    console.log('req.headers', req.headers);
    console.log('req.body', req.body);
    return res.json(req.user);
};

exports.unauthorized = (req, res) => {
    console.log('authController unauthorized');
    console.log('req.headers', req.headers);
    console.log('req.body', req.body);
    return res.status(403).json(req.user);
};