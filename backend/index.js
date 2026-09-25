require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
const roomRoutes = require('./routes/roomRoutes');
const authRoutes = require('./routes/authRoutes');
const adminBookingRoutes = require('./routes/adminBookingRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', bookingRoutes);
app.use('/api', roomRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminBookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));