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

// endpoint per ottenere tutte le carte di un utente dato l'id di uno user 
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

        // controlla se l'ID utente è valido
        if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
            return res.status(400).json({ message: 'ID utente non valido.' });
        }

        // controlla se lo stato è valido
        const validStatuses = ['pending', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Stato non valido. Deve essere "pending", "completed" o "cancelled".' });
        }

        // Trova tutti i trade in cui l'utente è presente come sender o receiver con lo stato specificato
        const user = await User.findById(req.user._id).populate({
            path: 'trades',
            match: { status: status }, // Filtro per status direttamente nella query
            populate: 'rec_cards sen_cards'
        });

        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato.' });
        }

        res.status(200).json(user.trades);
    } catch (error) {
        res.status(500).json({ message: 'Errore durante la ricerca dei trade', error: error.message });
    }
});

module.exports = router;