const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { requireAuth, requireRole } = require('../middleware/auth');
const { createStaffUser, listStaffUsers, toggleStaffStatus } = require('../controllers/userController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../frontend/public'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'staff-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.use(requireAuth, requireRole('admin', 'owner'));

router.get('/users', listStaffUsers);
router.post('/users', upload.single('image'), createStaffUser);
router.patch('/users/:id/status', toggleStaffStatus);

module.exports = router;