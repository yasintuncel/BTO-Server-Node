const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserStatusSchema = new Schema({
    // isAi: { type: Boolean, default: false },
    isInBlackList: { type: Boolean, default: false },
    blackListAt: { type: Number },
    isDeleted: { type: Boolean, default: false },
    deleteAt: { type: Number },
}, { _id: false });

const UserStatus = mongoose.model('userStatus', UserStatusSchema);

module.exports = { UserStatus, UserStatusSchema };