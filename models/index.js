require('dotenv').config();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true });

exports.Task = mongoose.model('Task', {
    description: { type: String, required: true, trim: true },
    done: Boolean
});

exports.User = mongoose.model('User', {
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true }
});