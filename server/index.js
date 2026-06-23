const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/food'); 
const orderRoutes = require('./routes/order');  

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes); 
app.use('/api/orders', orderRoutes); 

//Database + Server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`)
        });
    })
    .catch(err => console.error('Database Connection error: ', err));