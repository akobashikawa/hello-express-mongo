// http://www.codingpedia.org/ama/cleaner-code-in-nodejs-with-async-await-mongoose-calls-example

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
    try {
        const newTask = new Task(data);
        const result = await newTask.save();
    } catch (error) {
        console.error(error);
    }
};

service.delete = async (id) => {
    try {
        const result = await Task.findOneAndRemove({ _id: id });
        return result;
    } catch (error) {
        console.error(error);
    }
};

module.exports = service;