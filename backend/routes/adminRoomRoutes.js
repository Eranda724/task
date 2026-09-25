const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const { listAllRooms, createRoom, updateRoom } = require('../controllers/roomController');

router.use(requireAuth, requireRole('admin', 'owner'));

router.get('/rooms', listAllRooms);
router.post('/rooms', createRoom);
router.patch('/rooms/:id', updateRoom);

module.exports = router;