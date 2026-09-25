const express = require('express');
const router = express.Router();
const { getPublicStaff } = require('../controllers/userController');

router.get('/staff', getPublicStaff);

module.exports = router;
