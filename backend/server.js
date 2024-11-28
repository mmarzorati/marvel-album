const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const Card = require('./models/Card');
const Trade = require('./models/Trade');
// routes
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const tradesRoutes = require('./routes/trades');


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


app.use(cookieParser());


app.use(usersRoutes);
app.use(cardsRoutes);
app.use(tradesRoutes);
