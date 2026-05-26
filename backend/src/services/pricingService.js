const fs = require('fs');
const path = require('path');
const Part = require('../models/Part');
const { getEffectivePrice } = require('../utils/dateUtils');

/**
 * PricingService loads part data from JSON and provides a method to calculate
 * a price breakdown for a given list of part IDs on a specific date.
 */
class PricingService {
  constructor() {
    this.parts = [];
    this._loadData();
  }

  // Returns an array of all part IDs available in the data
  getAvailablePartIds() {
    return this.parts.map(p => p.id);
  }
  _loadData() {
    const dataPath = path.join(__dirname, '..', 'data', 'pricing.json');
    try {
      const raw = fs.readFileSync(dataPath, 'utf8');
      const parsed = JSON.parse(raw);
      this.parts = parsed.map(p => new Part(p.id, p.name, p.component, p.priceHistory));
    } catch (err) {
      console.error('Failed to load pricing data:', err);
    }
  }

  /**
   * Calculate price breakdown.
   * @param {string[]} selectedParts - array of part IDs requested by the client
   * @param {string} date - ISO date string for which the price should be evaluated
   * @returns {{breakdown: Object.<string, number>, total: number}}
   */
  calculatePrice(selectedParts, date) {
    if (!Array.isArray(selectedParts) || !date) {
      throw new Error('selectedParts (array) and date are required');
    }

    const breakdown = {};
    let total = 0;

    for (const partId of selectedParts) {
      const part = this.parts.find(p => p.id === partId);
      if (!part) continue; // ignore unknown part IDs

      const price = getEffectivePrice(part, date);
      if (price === null) continue; // no price for this date

      // Group by component (as stored in the data)
      const component = part.component;
      breakdown[component] = (breakdown[component] || 0) + price;
      total += price;
    }

    return { breakdown, total };
  }
}

module.exports = new PricingService();
