require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const usersService = require('../services/users');


passport.use('login', new LocalStrategy(function (username, password, done) {
    console.log('passport LocalStrategy - login', { username, password });
    const data = { username, password };
    usersService.login(data)
        .then(user => {
            const token = jwt.sign(user, jwtSecret);
            user.token = token;
            return done(null, user);
        })
        .catch(err => {
            err.status = 401;
            return done(err, false);
        });
}));

passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
}, function (jwt_payload, done) {
    console.log('passport JwtStrategy - jwt', { jwt_payload });
    const id = jwt_payload.id;
    usersService.get(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            err.status = 401;
            done(err, false);
        });
}));

exports.authenticate = passport.authenticate('login', { failWithError: true, session: false });
exports.isAuthenticated = passport.authenticate('jwt', { session: false });

exports.passport = passport;