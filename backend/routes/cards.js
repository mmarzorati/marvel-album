const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewere');

const User = require('../models/User');

/**
 * @openapi
 * /api/cards/{userId}:
 *   get:
 *     summary: Get all cards for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

// endpoint per ottenere tutte le carte di un utente dato l'id di uno user 
router.get('/api/cards/:userId', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId).populate('collec.cardId');
        if (!user) {
            return res.status(404).send({message: 'User not found'});
        }

        res.status(200).send(user.collec);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error', error: error });
    }
});

/**
 * @swagger
 * /api/cards/{cardId}:
 *   delete:
 *     summary: Remove a card from the user's collection
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the card
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Card removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 collec:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Card'
 *       401:
 *         description: "Access denied: token missing or malformed"
 *       404:
 *         description: Card not found in the user's collection or user not found
 *       500:
 *         description: Internal server error
 */
// endpoint per la rimozione di una carta
router.delete('/api/cards/:cardId', authMiddleware, async (req, res) => {
    const { cardId } = req.params;

    try {
        const user = await User.findById(req.user._id).populate('collec.cardId');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // troviamo la carta nella collection dell'utente
        const cardIndex = user.collec.findIndex(item => item.cardId._id.toString() === cardId);

        if (cardIndex === -1) {
            return res.status(404).json({ message: 'Card not found in user collection' });
        }

        const card = user.collec[cardIndex];

        // se maggiore di uno viene solo diminuita la quantità
        if (card.quantity > 1) {
            card.quantity -= 1;
        } else {
            // altrimenti viene rimossa completamente la carta
            user.collec.splice(cardIndex, 1);
        }

        user.coins += 1;
        await user.save();

        res.status(200).json({ message: 'Card successfully removed', collec: user.collec });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;