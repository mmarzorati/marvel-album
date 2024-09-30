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
        res.status(500).send(error.message);
    }
});

// Endpoint per ottenere tutte le carte di un utente
router.get('/users/:id/cards', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('collection');
        if (!user) {
        return res.status(404).send('User not found');
        }
        res.send(user.collection);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;