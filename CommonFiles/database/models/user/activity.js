const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    isOnline: { type: Boolean, default: false },
    lastActiveAt: { type: Number, default: Date.now },
    isInGame: { type: Boolean, default: false },
    gameId: { type: String, default: "none" },
}, { _id: false });

const Activity = mongoose.model('activity', ActivitySchema);

module.exports = { Activity, ActivitySchema };