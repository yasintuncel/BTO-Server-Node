const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LevelSchema = new Schema({
    level: { type: Number, default: 1 },
    experience: { type: Number, default: 0 },
}, { _id: false, autoCreate: false });

const Level = mongoose.model('level', LevelSchema);

module.exports = { Level, LevelSchema };