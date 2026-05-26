const isDateInRange = (targetDateStr, validFromStr, validUntilStr) => {
  const targetDate = new Date(targetDateStr);
  const start = new Date(validFromStr);
  const end = validUntilStr ? new Date(validUntilStr) : null;

  if (targetDate >= start && (!end || targetDate <= end)) {
    return true;
  }
  return false;
};

module.exports = {
  isDateInRange
};
