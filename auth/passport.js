const passport = require('passport');
const LocalStrategy = require('passport-local');
// const LocalAPIKeyStrategy = require('passport-localapikey/strategy');
const usersService = require('../services/users');

// run on every login
passport.serializeUser(function (user, done) {
    console.log('serializeUser', user);
    done(null, user.id);
});

// run on every request after login 
passport.deserializeUser(function (id, done) {
    console.log('deserializeUser', id);
    usersService.get(id)
        .then(user => {
            done(null, user)
        });
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

exports.authenticate = passport.authenticate('local', { failWithError: true, session: true });

exports.logout = (req, res) => req.logout();

exports.passport = passport;