const Treatment = require('../models/Treatment');

async function listTreatments(req, res) {
    try {
        const treatments = await Treatment.find({ isActive: true }).sort({ createdAt: -1 });
        res.json(treatments);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch treatments' });
    }
}

async function listAllTreatments(req, res) {
    try {
        const treatments = await Treatment.find().sort({ createdAt: -1 });
        res.json(treatments);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch all treatments' });
    }
}

async function createTreatment(req, res) {
    try {
        const treatment = await Treatment.create(req.body);
        res.status(201).json(treatment);
    } catch (err) {
        res.status(500).json({ error: 'Could not create treatment' });
    }
}

async function updateTreatment(req, res) {
    try {
        const treatment = await Treatment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(treatment);
    } catch (err) {
        res.status(500).json({ error: 'Could not update treatment' });
    }
}

module.exports = { listTreatments, listAllTreatments, createTreatment, updateTreatment };
