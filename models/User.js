const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

UserSchema = {
    username: { type: String, required: true, trim: true, index: { unique: true } },
    password: { type: String, required: true }
};

module.exports = mongoose.model('User', UserSchema);