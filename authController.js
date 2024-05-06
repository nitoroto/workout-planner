const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NodeCache = require("node-cache");
const bcryptCache = new NodeCache({ stdTTL: 100, checkperiod: 120 }); // Cache TTL is 100 seconds and checks every 120 seconds
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Database connection error:', err));

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', UserSchema);

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        const cacheKey = `${username}-${password}`;
        let isMatch = bcryptCache.get(cacheKey);
        if (isMatch === undefined) {
            isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                bcryptCache.set(cacheKey, isMatch);
            }
        }
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (error) {
        done(error);
    }
}));

const register = async (req, res) => { /* unchanged */ };

const login = async (req, res, next) => { /* unchanged */ };

const authenticate = passport.authenticate('jwt', { session: false });

module.exports = {
    register,
    login,
    authenticate,
};