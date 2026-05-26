class PriceEntry {
  constructor(validFrom, validUntil, price) {
    this.validFrom = validFrom;
    this.validUntil = validUntil;
    this.price = price;
  }
}

module.exports = PriceEntry;
