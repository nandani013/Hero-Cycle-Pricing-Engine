const fs = require('fs');
const path = require('path');
const Part = require('../models/Part');
const { isDateInRange } = require('../utils/dateUtils');

class PricingService {
  constructor() {
    this.parts = [];
    this.loadData();
  }

  loadData() {
    const dataPath = path.join(__dirname, '..', 'data', 'pricing.json');
    try {
      const rawData = fs.readFileSync(dataPath, 'utf8');
      const parsed = JSON.parse(rawData);
      this.parts = parsed.map(p => new Part(p.id, p.name, p.component, p.priceHistory));
    } catch (err) {
      console.error("Error loading pricing data:", err);
    }
  }

  calculatePrice(parts, date) {
    if (!parts || !Array.isArray(parts) || !date) {
      throw new Error('parts array and date are required');
    }

    const categoryTotals = {};
    let grandTotal = 0;

    for (const partId of parts) {
      const part = this.parts.find(p => p.id === partId);
      if (!part) continue;

      let priceForDate = 0;
      for (const entry of part.priceHistory) {
        if (isDateInRange(date, entry.validFrom, entry.validUntil)) {
          priceForDate = entry.price;
          break;
        }
      }

      if (priceForDate > 0) {
        categoryTotals[part.component] = (categoryTotals[part.component] || 0) + priceForDate;
        grandTotal += priceForDate;
      }
    }

    return { breakdown: categoryTotals, total: grandTotal };
  }
}

module.exports = new PricingService();
