const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);

//Database + Server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`)
        });
    })
    .catch(err => console.error('Database Connection error: ', err));