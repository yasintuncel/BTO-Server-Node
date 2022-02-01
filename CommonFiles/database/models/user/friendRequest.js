const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
    from: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    createdAt: { type: Number, default: Date.now },
}, { _id: false, autoCreate: false });

const FriendRequest = mongoose.model('friendRequest', FriendRequestSchema);

module.exports = { FriendRequest, FriendRequestSchema };