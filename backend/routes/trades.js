const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewere');
const mongoose = require('mongoose');

const User = require('../models/User');
const Card = require('../models/Card');
const Trade = require('../models/Trade');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// endpoint per creare un nuovo "trade"
router.post('/api/trades', authMiddleware, async (req, res) => {
    try {
        const { receiver_id, rec_cards, sen_cards } = req.body;
        const sender_id = req.user._id;

        // controlla se i campi obbligatori sono presenti
        if ( !receiver_id || !Array.isArray(rec_cards) || !Array.isArray(sen_cards)) {
            return res.status(400).json({ message: 'Parametri non validi: sender_id, receiver_id, rec_cards e sen_cards sono obbligatori.' });
        }

        // controlla se gli ID sono validi
        if ( !isValidObjectId(receiver_id)) {
            return res.status(400).json({ message: 'ID non valido per sender_id o receiver_id.' });
        }

        // controlla che gli array contengano solo ObjectId validi
        if (!rec_cards.every(isValidObjectId) || !sen_cards.every(isValidObjectId)) {
            return res.status(400).json({ message: 'rec_cards e sen_cards devono contenere solo ID validi.' });
        }

        // controlla se gli array sono vuoti (controllo già presente anche a FE)
        if (rec_cards.length === 0 || sen_cards.length === 0) {
            return res.status(400).json({ message: 'rec_cards e sen_cards non possono essere vuoti.' });
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

        res.status(201).json(savedTrade);
    } catch (error) {
        res.status(500).json({ message: 'Errore durante la creazione del trade', error: error.message });
    }
})

router.get('/api/trades/:status', authMiddleware, async (req, res) => {
    try {
        const { status } = req.params;
        const userId = req.user._id;

        // controlla se l'ID utente è valido
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'ID utente non valido.' });
        }

        // controlla se lo stato è valido
        const validStatuses = ['pending', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Stato non valido. Deve essere "pending", "completed" o "cancelled".' });
        }

        // trova tutti i trade in cui l'utente è presente come sender o receiver con lo stato specificato
        const user = await User.findById(userId).populate({
            path: 'trades',
            match: { status: status }, // Filtro per status direttamente nella query
            populate: 'rec_cards sen_cards'
        });

        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato.' });
        }

        const sent_trades = user.trades.filter(trade => trade.sender_id.toString() === userId.toString());
        const received_trades = user.trades.filter(trade => trade.receiver_id.toString() === userId.toString());

        res.status(200).json({ sent_trades, received_trades });
    } catch (error) {
        res.status(500).json({ message: 'Errore durante la ricerca dei trade', error: error.message });
    }
});

router.patch('/api/trades', authMiddleware, async (req, res) => {
    try {
        const { tradeId, status } = req.body;
        const userId = req.user._id;

        // Verifica se l'ID del trade è valido
        if (!mongoose.Types.ObjectId.isValid(tradeId)) {
            return res.status(400).json({ message: 'ID trade non valido.' });
        }

        // conrtrolla che lo stato sia valido
        const validStatuses = ['completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Stato non valido. Deve essere "completed" o "cancelled".' });
        }

        // controlla che l'utente sia coinvolto come sender o receiver
        const trade = await Trade.findOne({
            _id: tradeId,
            $or: [{ sender_id: userId }, { receiver_id: userId }]
        });
        if (!trade) {
            return res.status(404).json({ message: 'Trade non trovato o accesso negato.' });
        }

        trade.status = status;
        await trade.save();

        res.status(200).json({ message: `Stato del trade aggiornato a ${status}.`, trade });
    } catch (error) {
        res.status(500).json({ message: 'Errore durante l\'aggiornamento dello stato del trade.', error: error.message });
    }
});

module.exports = router;