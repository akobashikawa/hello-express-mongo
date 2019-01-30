const mongoose = require('mongoose');
const Schema = mongoose.Schema;

TaskSchema = {
    description: { type: String, required: true, trim: true },
    done: Boolean
};

module.exports = mongoose.model('Task', TaskSchema);