const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the user in the database.
 *           example: "67574a7dfc106b5a4ef3f6db"
 *         username:
 *           type: string
 *           description: The username of the user. It must be unique.
 *           example: "john_doe"
 *         name:
 *           type: string
 *           description: The full name of the user.
 *           example: "Pino Cecconi"
 *         email:
 *           type: string
 *           description: The email address of the user. It must be unique.
 *           example: "pino@gmail.com"
 *         password:
 *           type: string
 *           description: The password of the user (hashed before storing).
 *           example: "hashed_password_string" # (pino).
 *         collec:
 *           type: array
 *           description: List of cards in the user's collection.
 *           items:
 *             type: object
 *             properties:
 *               cardId:
 *                 type: object
 *                 items:
 *                   $ref: '#/components/schemas/Card'
 *               quantity:
 *                 type: number
 *                 description: The quantity of the card in the user's collection.
 *                 example: 2
 *         trades:
 *           type: array
 *           description: List of trade IDs associated with the user.
 *           items:
 *             $ref: '#/components/schemas/Trade'
 *         coins:
 *           type: number
 *           description: The amount of coins the user has.
 *           example: 150
 *       required:
 *         - username
 *         - name
 *         - email
 *         - password
 *         - coins
 *       additionalProperties: false
 */

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    collec: [{
        cardId: { type: Schema.Types.ObjectId, ref: 'Card', required: true },
        quantity: { type: Number, required: true }
    }],
    trades: [{ type: Schema.Types.ObjectId, ref: 'Trade' }],
    coins: { type: Number, required: true }
});

// prima del salvataggio cripta la password
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);