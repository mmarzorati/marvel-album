const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewere');
const mongoose = require('mongoose');

const User = require('../models/User');
const Trade = require('../models/Trade');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// endpoint per creare un nuovo "trade"
router.post('/api/trades', authMiddleware, async (req, res) => {
    try {
        const { receiver_id, rec_cards, sen_cards } = req.body;
        const sender_id = req.user._id;

        // controlla se i campi obbligatori sono presenti
        if ( !receiver_id || !Array.isArray(rec_cards) || !Array.isArray(sen_cards)) {
            return res.status(400).json({ message: 'Invalid parameters: sender_id, receiver_id, rec_cards, and sen_cards are required' });
        }

        // controlla se gli ID sono validi
        if ( !isValidObjectId(receiver_id)) {
            return res.status(400).json({ message: 'Invalid ID for receiver_id' });
        }

        // controlla che gli array contengano solo ObjectId validi
        if (!rec_cards.every(isValidObjectId) || !sen_cards.every(isValidObjectId)) {
            return res.status(400).json({ message: 'rec_cards and sen_cards must contain only valid IDs' });
        }

        // controlla se gli array sono vuoti (controllo già presente anche a FE)
        if (rec_cards.length === 0 || sen_cards.length === 0) {
            return res.status(400).json({ message: 'rec_cards and sen_cards cannot be empty' });
        }

        const newTrade = new Trade({
            sender_id,
            receiver_id,
            rec_cards,
            sen_cards
        });
        const savedTrade = await newTrade.save();

        // aggiunge agli utenti mittente e al destinatario lo scambio nel reciproco campo
        await User.findByIdAndUpdate(sender_id, {
            $push: { trades: savedTrade._id }
        });
        await User.findByIdAndUpdate(receiver_id, {
            $push: { trades: savedTrade._id }
        });

// trova tutti i trade in cui l'utente è presente come sender o receiver con lo stato specificato
const sent_trades_data = await User.findById(sender_id).select('trades').populate({
    path: 'trades',
    match: { status: 'pending', sender_id: sender_id }, // Filtro per stato e sender
    populate: [
        {
            path: 'sender_id',
            select: 'name username' // Seleziona solo name e username
        },
        {
            path: 'receiver_id',
            select: 'name username'
        },
        { 
            path: 'rec_cards sen_cards'
        }
    ]
});

const received_trades_data = await User.findById(sender_id).select('trades').populate({
    path: 'trades',
    match: { status: 'pending', receiver_id: sender_id },
    populate: [
        {
            path: 'sender_id',
            select: 'name username'
        },
        {
            path: 'receiver_id',
            select: 'name username'
        },
        { 
            path: 'rec_cards sen_cards'
        }
    ]
});

// aggiunge il campo `date` ai trade inviati
const sent_trades = sent_trades_data.trades.map(trade => ({
    ...trade.toObject(),
    date: trade._id.getTimestamp() 
}));

// aggiunge il campo `date` ai trade ricevuti
const received_trades = received_trades_data.trades.map(trade => ({
    ...trade.toObject(),
    date: trade._id.getTimestamp()
}));

res.status(200).json({ sent_trades, received_trades, message: 'The new trade has been successfully created!' });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
})

// endpoint per la restituzione dei trades per status
router.get('/api/trades/:status', authMiddleware, async (req, res) => {
    try {
        const { status } = req.params;
        const userId = req.user._id;

        // controlla se l'ID utente è valido
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // controlla se lo stato è valido
        const validStatuses = ['pending', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status. It must be "pending," "completed," or "cancelled' });
        }

        // trova tutti i trade in cui l'utente è presente come sender o receiver con lo stato specificato
        const sent_trades_data = await User.findById(userId).select('trades').populate({
            path: 'trades',
            match: { status: status, sender_id: userId }, // filtro per status direttamente nella query
            populate: [
                {
                    path: 'sender_id',
                    select: 'name username' // seleziona solo name e username
                },
                {
                    path: 'receiver_id',
                    select: 'name username'
                },
                { 
                    path: 'rec_cards sen_cards'
                }
            ]
        });

        const received_trades_data = await User.findById(userId).select('trades').populate({
            path: 'trades',
            match: { status: status, receiver_id: userId },
            populate: [
                {
                    path: 'sender_id',
                    select: 'name username'
                },
                {
                    path: 'receiver_id',
                    select: 'name username' 
                },
                { 
                    path: 'rec_cards sen_cards' 
                }
            ]
        });

        // aggiunge il campo `date` ai trade inviati
        const sent_trades = sent_trades_data.trades.map(trade => ({
            ...trade.toObject(),
            date: trade._id.getTimestamp() // estrae la data dall'ObjectId
        }));

        // aggiunge il campo `date` ai trade ricevuti
        const received_trades = received_trades_data.trades.map(trade => ({
            ...trade.toObject(),
            date: trade._id.getTimestamp()
        }));

        res.status(200).json({ sent_trades, received_trades, message: `Here are all the ${status} trades` });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// endpoint per l'aggiornamento dello status di un trade
router.patch('/api/trades', authMiddleware, async (req, res) => {
    try {
        const { tradeId, status } = req.body;
        const userId = req.user._id;

        // verifica se l'ID del trade è valido
        if (!mongoose.Types.ObjectId.isValid(tradeId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // conrtrolla che lo stato sia valido
        const validStatuses = ['completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status. It must be "completed" or "cancelled"' });
        }

        // controlla che l'utente sia coinvolto come sender o receiver
        const trade = await Trade.findOne({
            _id: tradeId,
            $or: [{ sender_id: userId }, { receiver_id: userId }]
        });
        if (!trade) {
            return res.status(404).json({ message: 'Trade not found or access denied' });
        }

        // se si vuole cancellare il trade viene semplicemente cambiato lo stato 
        if (status !== 'completed') {
            trade.status = status;
            await trade.save();
            return res.status(200).json({ message: `The trade has been rejected` });
        }

        // se invece si vuole compltare il trade:
        const sender = await User.findById(trade.sender_id);
        const receiver = await User.findById(trade.receiver_id);
        if (!sender || !receiver) {
            return res.status(404).json({ message: 'Sender or recipient not found' });
        }

        // verifica se le carte degli scambi sono ancora possedute, magari è già stata scambiata
        // ma va fatto prima degli altri for per essere sicuri di non procedere ai vari scambi
        for (const card of trade.sen_cards) {
            const cardInCollection = sender.collec.find(item => item.cardId.toString() === card._id.toString());
            if (!cardInCollection || cardInCollection.quantity < 1) {
                trade.status = 'cancelled';
                await trade.save();
                return res.status(400).json({ message: `The user does not own the card with the name: ${card.name}. The trade has been rejected `, trade });
            }
        }

        for (const card of trade.rec_cards) {
            const cardInCollection = receiver.collec.find(item => item.cardId.toString() === card._id.toString());
            if (!cardInCollection || cardInCollection.quantity < 1) {
                trade.status = 'cancelled';
                await trade.save();
                return res.status(400).json({ message: `The user does not own the card with the name: ${card.name}. The trade has been rejected` , trade });
            }
        }

        // invio carte dal mittente al destinatario
            for (const card of trade.sen_cards) {
                const cardInCollection = sender.collec.find(item => item.cardId.toString() === card._id.toString());

                // riduzione della quantità della carta, se arriva a zero viene eliminata dal campo collec
                cardInCollection.quantity -= 1;
                if (cardInCollection.quantity === 0) {
                    sender.collec = sender.collec.filter(item => item.cardId.toString() !== card._id.toString());
                }

                // viene aggiunta la carta al desrtinatario stando attenti ai doppioni
                const cardInToUser = receiver.collec.find(item => item.cardId.toString() === card._id.toString());
                if (cardInToUser) {
                    cardInToUser.quantity += 1;
                } else {
                    receiver.collec.push({ cardId: card._id, quantity: 1 });
                }
            }

        // scambio da destinatario a mittente
            for (const card of trade.rec_cards) {
                const cardInCollection =  receiver.collec.find(item => item.cardId.toString() === card._id.toString());
                cardInCollection.quantity -= 1;
                if (cardInCollection.quantity === 0) {
                    receiver.collec = receiver.collec.filter(item => item.cardId.toString() !== card._id.toString());
                }

                const cardInToUser = sender.collec.find(item => item.cardId.toString() === card._id.toString());
                if (cardInToUser) {
                    cardInToUser.quantity += 1;
                } else {
                    sender.collec.push({ cardId: card._id, quantity: 1 });
                }
            }

        await sender.save();
        await receiver.save();

        trade.status = 'completed';
        await trade.save();

        res.status(200).json({ message: 'The trade has been accepted' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;

/**
 * @swagger
 * /api/trades:
 *   post:
 *     summary: Create a new trade
 *     description: Creates a new trade between two users.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiver_id:
 *                 type: string
 *                 description: ID of the receiver user.
 *                 example: "677ab2bf5210a64cff138ae9"
 *               rec_cards:
 *                 type: array
 *                 description: List of card IDs the receiver will give.
 *                 items:
 *                   type: string
 *                   example: "675186bd0632228092858b8a"
 *               sen_cards:
 *                 type: array
 *                 description: List of card IDs the sender will give.
 *                 items:
 *                   type: string
 *                   example: "675186bb0632228092858b79"
 *             required:
 *               - receiver_id
 *               - rec_cards
 *               - sen_cards
 *     responses:
 *       200:
 *         description: The new trade has been successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sent_trades:
 *                   type: array
 *                   description: List of sent trades.
 *                   items:
 *                     $ref: '#/components/schemas/Trade'
 *                 received_trades:
 *                   type: array
 *                   description: List of received trades.
 *                   items:
 *                     $ref: '#/components/schemas/Trade'
 *                 message:
 *                   type: string
 *                   example: "The new trade has been successfully created!"
 *       400:
 *         description: Bad Request. Invalid parameters or data.
 *       401:
 *         description: "Access denied: token missing or malformed"
 *       500:
 *         description: Internal Server Error.
 * 
 * 
 *   patch:
 *     summary: Update the status of a trade
 *     description: Updates the status of a trade to "completed" or "cancelled". Handles card exchanges between users if the trade is completed.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tradeId:
 *                 type: string
 *                 example: "60f1b8e8f8f8b8f8b8f8b8f8"
 *               status:
 *                 type: string
 *                 enum:
 *                   - completed
 *                   - cancelled
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: The trade has been updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The trade has been accepted"
 *       400:
 *         description: Bad request due to invalid trade ID, status, or card availability
 *       404:
 *         description: Trade or user not found, or access denied
 *       500:
 *         description: Internal server error
 * 
 * 
 * 
 *
 * /api/trades/{status}:
 *   get:
 *     summary: Get trades by status
 *     description: Retrieves all trades of a specific status where the user is involved.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pending, completed, cancelled]
 *         description: Status of the trades to retrieve.
 *     responses:
 *       200:
 *         description: A list of trades matching the status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sent_trades:
 *                   type: array
 *                   description: List of sent trades matching the status.
 *                   items:
 *                     $ref: '#/components/schemas/Trade'
 *                 received_trades:
 *                   type: array
 *                   description: List of received trades matching the status.
 *                   items:
 *                     $ref: '#/components/schemas/Trade'
 *                 message:
 *                   type: string
 *                   example: "Here are all the pending trades"
 *       400:
 *         description: Bad Request. Invalid parameters or data.
 *       401:
 *         description: "Access denied: token missing or malformed"
 *       500:
 *         description: Internal Server Error.
 * 
 */