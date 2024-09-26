const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Card = require('./models/Card');
const Trade = require('./models/Trade');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = 3001;
app.use(express.json());

// Avvio del server
app.listen(3001, () => {
    console.log(`Application is running on port ${PORT}`);
})

// Connessione al database locale di mongoDB "mavel-album" - porta di default: 27017
mongoose.connect('mongodb://localhost:27017/marvel-album').then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

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

app.use(usersRoutes);
