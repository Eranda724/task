const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, default: '' },
        pricePerNight: { type: Number, required: true },
        maxGuests: { type: Number, required: true, default: 2 },
        image: { type: String, default: '' },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);