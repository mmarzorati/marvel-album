const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewere');

const User = require('../models/User');
const Card = require('../models/Card');
const Trade = require('../models/Trade');

// endpoint per la creazione di un utente
router.post('/api/users', async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            coins: 0
        });
        
        await user.save();

        const token = jwt.sign(
            { 
                _id: user._id, 
                email: user.email,
                username: user.username,
                name: user.name,
                coins: user.coins
            },
            config.JWT_SECRET,               // chiave segreta per firmare il token
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,         // non accessibile via JavaScript (migliora la sicurezza)
            secure: process.env.NODE_ENV === 'production',      // Solo su HTTPS in produzione
            maxAge: 60 * 60 * 1000 // 1 ora
        });
        res.status(201).send({ message: 'User saved successfully', user });

    } catch (error) {
        if (error.code === 11000) {
            // gestisce l'errore di unicità per username o email
            return res.status(400).send({ message: 'Username or email already exists' });
        }
        res.status(500).send(error);
    }
});

// endpoint per il processo di login
router.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Username or password is wrong' });
        }

        const token = jwt.sign(
            { 
                _id: user._id, 
                email: user.email,
                username: user.username,
                name: user.name,
                coins: user.coins
            },
            config.JWT_SECRET,               // chiave segreta per firmare il token
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,         // non accessibile via JavaScript (migliora la sicurezza)
            secure: process.env.NODE_ENV === 'production',      // Solo su HTTPS in produzione
            maxAge: 60 * 60 * 1000 // 1 ora
        });
        return res.status(200).json({ message: 'Login completed successfully' });

    } catch (error) {
        console.error('Errore nel login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.get('/api/user', authMiddleware, async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// endpoint per ottenere tutte le carte di un utente
router.get('/api/users/cards',authMiddleware , async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('collec');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user.collec);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// endpoint per l'aggiunta di una carta nel database
router.post('/api/users/add-card', authMiddleware , async (req, res) => {
    const { marvelId, name, description, pathImg } = req.body;

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let card = await Card.findOne({ marvelId });
        // se non è presente nel database crea la carta
        if (!card) {
            card = new Card({
                marvelId,
                name,
                description,
                pathImg
            });
            await card.save();

        }

        // indipendentemente se abbia già la carta o meno la aggiunge
        user.collec.push(card._id);
        await user.save();
        console.log('Carta aggiunta alla collezione dell\'utente');

        res.status(200).json({ message: 'Carta gestita correttamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Errore del server' });
    }
});

module.exports = router;