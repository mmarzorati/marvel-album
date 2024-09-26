const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/User');
const Card = require('../models/Card');
const Trade = require('../models/Trade');

// Endpoint per creare un utente
router.post('/api/users', async (req, res) => {
    try {
        // Creazione di un nuovo utente con i dati forniti
        const user = new User({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        
        // Salvataggio del nuovo utente nel database
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        if (error.code === 11000) {
            // Gestisce l'errore di unicità per username o email
            return res.status(400).send({ message: 'Username or email already exists' });
        }
        res.status(400).send(error);
    }
});

router.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;

        // Verifica che i campi siano presenti
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
    
        // // Creazione del cookie sicuro con l'ID dell'utente
        // res.cookie('userId', user._id, {
        //     httpOnly: true, // Il cookie è accessibile solo dal server
        //     secure: true,   // Il cookie è inviato solo tramite HTTPS (in ambiente di produzione)
        //     sameSite: 'strict', // Previene CSRF
        // });
    
        return res.status(200).json({ message: 'Login completed successfully' });
        } catch (error) {
        console.error('Errore nel login:', error);
        return res.status(500).json({ message: 'Server error' });
        }
});

router.get('/api/users', async (req, res) => {
    try {
        // Trova tutti gli utenti nella collection
        const users = await User.find();
        
        // Se non ci sono utenti, restituisci un errore
        if (!users || users.length === 0) {
            return res.status(404).send('No users found');
        }

        // Restituisci tutti gli utenti
        res.status(200).json(users);
    } catch (error) {
        // Gestisci eventuali errori
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