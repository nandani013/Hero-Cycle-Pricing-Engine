const express = require('express');
const router = express.Router();
const pricingService = require('../services/pricingService');

router.post('/calculate-price', (req, res) => {
  try {
    const { date, parts } = req.body;
    
    if (!date || !parts) {
      return res.status(400).json({ error: 'Date and parts are required' });
    }

    const result = pricingService.calculatePrice(parts, date);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
