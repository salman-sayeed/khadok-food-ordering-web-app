const express = require('express');
const router = express.Router();
const { createCheckoutSession, handleWebhook } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.post('/create-checkout-session', protect, createCheckoutSession);

// Webhook needs raw body — registered separately in index.js
router.post('/webhook', handleWebhook);

module.exports = router;