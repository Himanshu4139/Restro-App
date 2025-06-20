const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/db');
connectDB();
const adminRoutes = require('./routes/admin.routes');
const foodRoutes = require('./routes/food.routes');
const userRoutes = require('./routes/user.routes');
const paymentRoutes = require('./routes/payment.routes');
const { urlencoded } = require('body-parser');

// app.use(cors({
//     origin:'http://localhost:5173',
//     credentials: true
// }));  
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use(urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/admin', adminRoutes);
app.use('/admin/food', foodRoutes);
app.use('/user',userRoutes);
app.use('/payment', paymentRoutes);


module.exports = app;
