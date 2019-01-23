const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/hello-express-mongo`, { useNewUrlParser: true });

const Task = mongoose.model('Task', { description: String });

const service = () => { };

service.getAll = async () => {
    try {
        const result = await Task.find();
        return result;
    } catch (error) {
        console.error(error);
    }
};

service.add = async (data) => {
    const newTask = new Task(data);
    newTask.save((err, res) => {
        if (err) {
            return console.error(err);
        }
        return res;
    });
};

module.exports = service;