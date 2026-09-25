const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find({ isActive: true });
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch rooms' });
    }
});

module.exports = router;