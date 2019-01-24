require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true });

const model = mongoose.model('Task', { description: String });

module.exports = model;