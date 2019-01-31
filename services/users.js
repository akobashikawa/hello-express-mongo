// http://www.codingpedia.org/ama/cleaner-code-in-nodejs-with-async-await-mongoose-calls-example

const { User } = require('../models');

exports.getAll = () => {
    try {
        return User.find();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.get = (id) => {
    try {
        return User.findById(id);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.add = (data) => {
    try {
        const newUser = new User(data);
        return newUser.save();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.delete = (id) => {
    try {
        return User.findOneAndRemove({ _id: id });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.update = async (id, data) => {
    try {
        const user = await User.findOne({ username: data.username }).select('+password');
        if (!user) {
            throw new Error('User not found');
        }

        const isValidPassword = await user.comparePassword(data.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        user.password = data.passwordUpdate;
        user.save();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.login = async (data) => {
    try {
        const user = await User.findOne({ username: data.username }).select('+password');
        if (!user) {
            throw new Error('User not found or invalid password');
        }

        const isValidPassword = await user.comparePassword(data.password);
        if (!isValidPassword) {
            throw new Error('User not found or invalid password');
        }

        const result = {
            username: user.username
        }
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
