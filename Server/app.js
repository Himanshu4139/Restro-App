const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/db');
connectDB();
const adminRoutes = require('./routes/admin.routes');
const foodRoutes = require('./routes/food.routes');
const { urlencoded } = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/admin', adminRoutes);
app.use('/admin/food', foodRoutes);


module.exports = app;