const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier of the card in the database
 *           example: "67830a73930e30f53703220b"
 *         marvelId:
 *           type: string
 *           description: Id of the card in the Marvel portal
 *           example: "1009357"
 *         name:
 *           type: string
 *           description: Name of the card
 *           example: "Husk"
 *         description:
 *           type: string
 *           description: Detailed description of the card's character
 *           example: "Husk is a superhero in the Marvel Comics universe."
 *         pathImg:
 *           type: string
 *           description: Path or URL to the character's image
 *           example: "http://i.annihil.us/u/prod/marvel/i/mg/5/e0/4c003eca01988.jpg"
 *       required:
 *         - marvelId
 *         - name
 *         - pathImg
 *       additionalProperties: false
 */

const CardSchema = new Schema({
    marvelId: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    pathImg: { type: String, required: true}
});

module.exports = mongoose.model('Card', CardSchema);