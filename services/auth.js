// http://www.codingpedia.org/ama/cleaner-code-in-nodejs-with-async-await-mongoose-calls-example

const { User } = require('../models');

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
            id: user._id,
            username: user.username
        }
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
