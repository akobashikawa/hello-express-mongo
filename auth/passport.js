const passport = require('passport');
const LocalStrategy = require('passport-local');
const usersService = require('../services/users');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(function (username, password, done) {
    const data = { username, password };
    usersService.login(data)
        .then(result => {
            return done(null, result);
        })
        .catch(err => {
            return done(err, false);
        });
}));

module.exports = passport;