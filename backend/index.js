const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const PORT = process.env.PORT;
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

const corsOptions = {
    origin: 'https://bitsyurl.vercel.app',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'auth-token', 'index-to-modify'],
    credentials: true
};

app.use(express.json());
app.use(cors(corsOptions));


mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.wnzr6.mongodb.net/${DB_NAME}`);

//routes

app.use('/', require('./Routers/GenerateURL'));

app.listen(PORT, (e) => {
    if(!e) {
        console.log("app is listening at port 3000");
    }
    else {
        console.log("Error ", e);
    }
});
