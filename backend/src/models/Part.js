const PriceEntry = require('./PriceEntry');

class Part {
  constructor(id, name, component, priceHistory) {
    this.id = id;
    this.name = name;
    this.component = component;
    this.priceHistory = priceHistory.map(
      entry => new PriceEntry(entry.validFrom, entry.validUntil, entry.price)
    );
  }
}

module.exports = Part;
