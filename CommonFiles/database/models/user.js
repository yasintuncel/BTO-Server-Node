const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ActivitySchema} = require('./user/activity');
const {LevelSchema} = require('./user/level');
const {GoldSchema} = require('./user/gold');
const {UserStatusSchema} = require('./user/status');

const UserSchema = new Schema({
    nickName: { type: String, required: true },
    uid: { type: String, required: true, unique: true },
    token: { type: String }, // TODO delete on prod
    createdAt: { type: Number, default: Date.now },
    status: UserStatusSchema,
    gold: GoldSchema,
    level: LevelSchema,
    activity: ActivitySchema,
});

const User = mongoose.model('user', UserSchema);

module.exports = { User, UserSchema };