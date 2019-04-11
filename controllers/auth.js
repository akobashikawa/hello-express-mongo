const authService = require('../services/auth');

exports.login = async (req, res) => {
    console.log('authController login');
    try {
        const data = req.body;
        const result = await authService.login(data);
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
    result.session = req.session;
    result.sessionID = req.sessionID;
    result.user = req.user;
    return res.json(result);
};