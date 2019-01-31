const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

UserSchema = new Schema({
    username: { type: String, required: true, trim: true, index: { unique: true } },
    password: { type: String, select: false, required: true }, // https://stackoverflow.com/a/12096922/740552
});

UserSchema.pre('save', async function (next) {
    const user = this;
    console.log('pre save', user);

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }

});

UserSchema.pre('findOneAndUpdate', async function (next) {
    const user = this._update;
    console.log('pre findOneAndUpdate', user);

    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }

});

UserSchema.methods.comparePassword = async function (sendedPassword) {
    let result = false;
    try {
        result = await bcrypt.compare(sendedPassword, this.password);
        return result;
    } catch (error) {
        return result;
    }
};

module.exports = mongoose.model('User', UserSchema);