const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TradeSchema = new Schema({
    sender_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rec_cards: [{ type: Schema.Types.ObjectId, ref: 'Card', required: true }],
    sen_cards: [{ type: Schema.Types.ObjectId, ref: 'Card', required: true }],
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
});

module.exports = mongoose.model('Trade', TradeSchema);
