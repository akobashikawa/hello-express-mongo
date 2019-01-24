// http://www.codingpedia.org/ama/cleaner-code-in-nodejs-with-async-await-mongoose-calls-example

const Task = require('../models/Task');

exports.getAll = async () => {
    try {
        const result = await Task.find();
        return result;
    } catch (error) {
        console.error(error);
    }
};

exports.add = async (data) => {
    try {
        const newTask = new Task(data);
        const result = await newTask.save();
    } catch (error) {
        console.error(error);
    }
};

exports.delete = async (id) => {
    try {
        const result = await Task.findOneAndRemove({ _id: id });
        return result;
    } catch (error) {
        console.error(error);
    }
};

exports.update = async (id, data) => {
    try {
        const result = await Task.findOneAndUpdate({ _id: id }, data, { new: true });
        return result;
    } catch (error) {
        console.error(error);
    }
};