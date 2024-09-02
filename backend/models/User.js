const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    collec: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
    trades: [{ type: Schema.Types.ObjectId, ref: 'Trade' }]
});

module.exports = mongoose.model('User', UserSchema);