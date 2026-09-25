const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: String, required: true },
    note: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Treatment', treatmentSchema);
