const express = require('express');
const router = express.Router();
const pricingService = require('../services/pricingService');

router.post('/calculate-price', (req, res) => {
  try {
    const { date, parts } = req.body;

    // Basic presence checks
    if (!date || !parts) {
      return res.status(400).json({ error: 'Date and parts are required' });
    }

    // Validate parts array
    if (!Array.isArray(parts) || parts.length === 0) {
      return res.status(400).json({ error: 'Parts must be a non‑empty array' });
    }

    // Validate date format
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    // Validate incompatible combinations
    // Tubeless tyre requires a compatible rim (id "tubeless_compatible")
    const hasTubelessTyre = parts.includes('tubeless_tyre');
    const hasCompatibleRim = parts.includes('tubeless_compatible');
    if (hasTubelessTyre && !hasCompatibleRim) {
      return res.status(400).json({ error: 'Tubeless tyres require compatible rims.' });
    }

    // Ensure all requested parts exist
    const availableIds = pricingService.getAvailablePartIds();
    const unknown = parts.filter(p => !availableIds.includes(p));
    if (unknown.length > 0) {
      return res.status(400).json({ error: `Unknown part IDs: ${unknown.join(', ')}` });
    }

    const result = pricingService.calculatePrice(parts, date);
    // Include the selected date in the response
    res.json({ ...result, date });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
