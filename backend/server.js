const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Card = require('./models/Card');
const Trade = require('./models/Trade');

const app = express();
app.use(express.json());

// Connessione al database locale di mongoDB "mavel-album" - porta di default: 27017
mongoose.connect('mongodb://localhost:27017/marvel-album').then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Endpoint per creare un utente
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Endpoint per ottenere tutte le carte di un utente
app.get('/users/:id/cards', async (req, res) => {
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

// Endpoint per creare uno scambio
app.post('/trades', async (req, res) => {
    try {
        const trade = new Trade(req.body);
        await trade.save();
        res.status(201).send(trade);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Endpoint per aggiornare lo status di uno scambio
app.patch('/trades/:id', async (req, res) => {
    try {
        const trade = await Trade.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!trade) {
        return res.status(404).send('Trade not found');
        }
        res.send(trade);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Avvio del server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
