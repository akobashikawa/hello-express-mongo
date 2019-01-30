require('dotenv').config();

const mongoose = require('mongoose');

// models
const Task = require('./Task');
const User = require('./User');

mongoose.connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true });

exports.Task = Task;

exports.User = User