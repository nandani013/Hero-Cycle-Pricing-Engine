const isDateInRange = (targetDateStr, validFromStr, validUntilStr) => {
  const targetDate = new Date(targetDateStr);
  const start = new Date(validFromStr);
  const end = validUntilStr ? new Date(validUntilStr) : null;

  if (targetDate >= start && (!end || targetDate <= end)) {
    return true;
  }
  return false;
};

/**
 * Returns the price for a given part on the specified date.
 * It iterates the part's priceHistory and returns the first matching entry.
 * If no entry matches, returns null.
 */
const getEffectivePrice = (part, dateStr) => {
  for (const entry of part.priceHistory) {
    if (isDateInRange(dateStr, entry.validFrom, entry.validUntil)) {
      return entry.price;
    }
  }
  // No matching entry – could be future date; return null
  return null;
};

module.exports = {
  isDateInRange,
  getEffectivePrice
};
