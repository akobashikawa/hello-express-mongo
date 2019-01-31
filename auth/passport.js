const passport = require('passport');
const LocalStrategy = require('passport-local');
// const LocalAPIKeyStrategy = require('passport-localapikey/strategy');
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
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            return done(err, false);
        });
}));

// passport.use(new LocalAPIKeyStrategy(function (apikey, done) {
//     console.log(apikey);
//     return done(null, { test: 1 });
// }));

exports.authenticate = passport.authenticate('local', { failureRedirect: '/api/users/unauthorized' });
exports.passport = passport;