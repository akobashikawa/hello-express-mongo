const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/hello-express-mongo`, { useNewUrlParser: true });

const model = mongoose.model('Task', { description: String });

module.exports = model;