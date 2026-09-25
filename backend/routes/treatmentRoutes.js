const express = require('express');
const router = express.Router();
const { listTreatments } = require('../controllers/treatmentController');

router.get('/treatments', listTreatments);

module.exports = router;
