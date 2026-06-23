const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User')
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async() => {
    const hashed = await bcrypt.hash('admin123', 10);
    await User.create({
        name: 'Admin',
        email: 'admin@test.com',
        password: hashed,
        role: 'admin'
    });
    console.log('Admin user seeded successfully');
    process.exit();
}).catch(err => {
    console.error(err);
    process.exit(1);
});