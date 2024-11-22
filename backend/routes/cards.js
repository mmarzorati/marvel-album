const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewere');

const User = require('../models/User');
const Card = require('../models/Card');
const Trade = require('../models/Trade');

// endpoint per ottenere tutte le carte di un utente dato l'id di uno user 
router.get('/api/cards/:userId', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId).populate('collec.cardId');
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send(user.collec);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;