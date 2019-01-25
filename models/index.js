require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true });

exports.Task = mongoose.model('Task', { description: String, done: Boolean });
exports.User = mongoose.model('User', { username: String, password: String });