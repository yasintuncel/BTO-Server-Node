const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoldSchema = new Schema({
    amount: { type: Number, default: 1000 },
    isIncreased: { type: Boolean, default: true },
}, { _id: false, autoCreate: false });

const Gold = mongoose.model('gold', GoldSchema);

module.exports = { Gold, GoldSchema };