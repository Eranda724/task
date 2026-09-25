const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { requireAuth, requireRole } = require('../middleware/auth');
const { listAllRooms, createRoom, updateRoom } = require('../controllers/roomController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../frontend/public'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'room-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.use(requireAuth, requireRole('admin', 'owner'));

router.get('/rooms', listAllRooms);
router.post('/rooms', upload.single('image'), createRoom);
router.patch('/rooms/:id', upload.single('image'), updateRoom);

module.exports = router;