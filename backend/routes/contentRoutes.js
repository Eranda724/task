const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const { getContent, updateContent } = require('../controllers/contentController');

router.get('/content', getContent);
router.patch('/admin/content', requireAuth, requireRole('admin', 'owner'), updateContent);

module.exports = router;