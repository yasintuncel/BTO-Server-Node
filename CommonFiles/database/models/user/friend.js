const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    playCount: { type: Number, default: 0 },
    createdAt: { type: Number, default: Date.now },
}, { _id: false, autoCreate: false });

const Friend = mongoose.model('friend', FriendSchema);

module.exports = { Friend, FriendSchema };