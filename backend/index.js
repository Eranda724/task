require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
const roomRoutes = require('./routes/roomRoutes');
const authRoutes = require('./routes/authRoutes');
const adminBookingRoutes = require('./routes/adminBookingRoutes');
const adminRoomRoutes = require('./routes/adminRoomRoutes');
const statsRoutes = require('./routes/statsRoutes');
const accountRoutes = require('./routes/accountRoutes');
const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');
const treatmentRoutes = require('./routes/treatmentRoutes');
const adminTreatmentRoutes = require('./routes/adminTreatmentRoutes');
const publicStaffRoutes = require('./routes/publicStaffRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', bookingRoutes);
app.use('/api', roomRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminBookingRoutes);
app.use('/api/admin', adminRoomRoutes);
app.use('/api/admin', statsRoutes);
app.use('/api/admin', accountRoutes);
app.use('/api/admin', userRoutes);
app.use('/api', contentRoutes);
app.use('/api', treatmentRoutes);
app.use('/api', publicStaffRoutes);
app.use('/api/admin', adminTreatmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));