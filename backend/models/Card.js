const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    id: { type: String, required: true },
    amount: { type: Number, required: true }
});

module.exports = mongoose.model('Card', CardSchema);