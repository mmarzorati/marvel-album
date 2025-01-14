const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// routes
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const tradesRoutes = require('./routes/trades');
const swaggerDocs = require('./swagger');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

// Avvio del server
app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
    swaggerDocs(app, PORT);
})

// Connessione al database locale di mongoDB "mavel-album" - porta di default: 27017
mongoose.connect(process.env.DB_CONNECT).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


app.use(cookieParser());
app.use(cors({    
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));


app.use(usersRoutes);
app.use(cardsRoutes);
app.use(tradesRoutes);
