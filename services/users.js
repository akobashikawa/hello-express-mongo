// http://www.codingpedia.org/ama/cleaner-code-in-nodejs-with-async-await-mongoose-calls-example

const { User } = require('../models');

exports.getAll = () => {
    try {
        return User.find();
    } catch (error) {
        console.error(error);
    }
};

exports.add = (data) => {
    try {
        const newUser = new User(data);
        return newUser.save();
    } catch (error) {
        console.error(error);
    }
};

exports.delete = (id) => {
    try {
        return User.findOneAndRemove({ _id: id });
    } catch (error) {
        console.error(error);
    }
};

exports.update = (id, data) => {
    try {
        return User.findOneAndUpdate({ _id: id }, data, { new: true });
    } catch (error) {
        console.error(error);
    }
};