const express = require('express');
const router = express.Router();
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
            process.env.JWT_SECRET,               // chiave segreta per firmare il token
            { expiresIn: '1h' }
        );

        res.status(201).send({ message: 'User saved successfully', token: token});

    } catch (error) {
        if (error.code === 11000) {
            // gestisce l'errore di unicità per username o email
            return res.status(400).send({ message: 'Username or email already exists'});
        }
        res.status(500).send({ message: 'Internal server error', error });
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
            process.env.JWT_SECRET,               // chiave segreta per firmare il token
            { expiresIn: '1h' }
        );

        return res.status(200).json({ message: 'Login completed successfully', token: token });

    } catch (error) {
        console.error('Errore nel login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// endpoint per la restituzione dei dati dell'utente
router.get('/api/user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById( req.user._id );
        const { username, coins, name, email } = user;
        res.status(200).json({ username, coins, name, email });
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Internal server error' , error: error.message});
    }
});

// endpoint per aggiornare un utente
router.put('/api/users', authMiddleware, async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // controllo di unicità per username
        if (req.body.username && req.body.username !== user.username) {
            const existingUsername = await User.findOne({ username: req.body.username });
            if (existingUsername) {
                return res.status(400).send({ message: 'Username already exists' });
            }
            user.username = req.body.username;      // aggiorna solo se passa il controllo
        }

        // controllo di unicità per email
        if (req.body.email && req.body.email !== user.email) {
            const existingEmail = await User.findOne({ email: req.body.email });
            if (existingEmail) {
                return res.status(400).send({ message: 'Email already exists' });
            }
            user.email = req.body.email;
        }

        if (req.body.name) {
            user.name = req.body.name;
        }

        await user.save();
        const { username, coin, name, email } = user;
        res.status(200).send({ message: 'User updated successfully', user: { username, coin, name, email } });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error });
    }
});

// endpoint perl'eliminazione di un utente
router.delete('/api/users', authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        // trova ed elimina l'utente
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
});

// endpoint per ottenere tutte le carte di un utente
router.get('/api/users/cards', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('collec.cardId');
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user.collec);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
});

// endpoint per l'aggiunta di una carta nel database
router.post('/api/users/add-card', authMiddleware, async (req, res) => {

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

        // controlla se la carta è già presente in "collec"
        const existingCard = user.collec.find(item => item.cardId.toString() === card._id.toString());
        if (existingCard) {
            // se presente incrementa solamente quantity
            existingCard.quantity += 1;
        } else {
            // se invece la carta non c'è già la aggiunge e imposta quantity a 1
            user.collec.push({ cardId: card._id, quantity: 1 });
        }

        await user.save();

        res.status(200).json({ message: 'Card successfully added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// endpoint per l'acquisto o la rimozione dei coins
router.post('/api/users/coins', authMiddleware, async (req, res) => {
    const { amount } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        if( (user.coins = user.coins + amount) < 0 ) {
            return res.status(400).json({ message: 'You don\'t have enough coins' });
        }
        await user.save();
        
        // dopo aver salvato l'utente viene aggiotnato il token dell'utente con i coins aggiornati
        const token = jwt.sign(
            { 
                _id: user._id, 
                email: user.email,
                username: user.username,
                name: user.name,
                coins: user.coins
            },
            process.env.JWT_SECRET,               // chiave segreta per firmare il token
            { expiresIn: '1h' }
        );

        res.status(200).send({ message: 'Coins wallet updated', coins: user.coins, token: token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// endpoint per la ricerca dell'utente
router.post('/api/users/search', authMiddleware, async (req, res) => {
    const { query } = req.query;
    const userId = req.user._id;

    try {
        if (!query) {
            return res.status(400).json({ message: 'You must provide a search string' });
        }

        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },  // cerca nei nome
                { username: { $regex: query, $options: 'i' } }  // cerca negli username
            ]
        });

        // filtra per escludere l'utente e restituire solo i campi che servono lato FE
        // esclude l'utente così non può fare scambi con se stesso

        const filteredUsers = users
            .filter(user => user.id !== userId)
            .map(user => ({
                _id: user._id,
                name: user.name,
                username: user.username
            }));

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server Error' });
    }
});

module.exports = router;