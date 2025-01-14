const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Trade:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the user in the database.
 *           example: "67574a7dfc106b5a4ef3f6db"
 *         sender_id:
 *           $ref: '#/components/schemas/User'
 *           example: "675186a80632228092858b69"
 *         receiver_id:
 *           $ref: '#/components/schemas/User'
 *           example: "67521a5d9cd91ff0735b7cc5"
 *         rec_cards:
 *           type: array
 *           description: List of cards the receiver will receive in the trade.
 *           items:
 *             $ref: '#/components/schemas/Card'
 *           example: "[67521a799cd91ff0735b7cde]"
 *         sen_cards:
 *           type: array
 *           description: List of cards the sender will send in the trade.
 *           items:
 *             $ref: '#/components/schemas/Card'
 *           example: "[67557e8927bbc23f8d441d58]"
 *         status:
 *           type: string
 *           description: The current status of the trade.
 *           enum:
 *             - pending
 *             - completed
 *             - cancelled
 *           default: pending
 *           example: "pending"
 *       required:
 *         - sender_id
 *         - receiver_id
 *         - rec_cards
 *         - sen_cards
 *         - status
 *       additionalProperties: false
 */

const TradeSchema = new Schema({
    sender_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rec_cards: [{ type: Schema.Types.ObjectId, ref: 'Card', required: true }],
    sen_cards: [{ type: Schema.Types.ObjectId, ref: 'Card', required: true }],
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
});

module.exports = mongoose.model('Trade', TradeSchema);
