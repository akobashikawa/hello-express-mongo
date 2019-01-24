// http://www.codingpedia.org/ama/cleaner-code-in-nodejs-with-async-await-mongoose-calls-example

const { Task } = require('../models');

exports.getAll = () => {
    try {
        return Task.find();
    } catch (error) {
        console.error(error);
    }
};

exports.add = (data) => {
    try {
        const newTask = new Task(data);
        return newTask.save();
    } catch (error) {
        console.error(error);
    }
};

exports.delete = (id) => {
    try {
        return Task.findOneAndRemove({ _id: id });
    } catch (error) {
        console.error(error);
    }
};

exports.update = (id, data) => {
    try {
        return Task.findOneAndUpdate({ _id: id }, data, { new: true });
    } catch (error) {
        console.error(error);
    }
};