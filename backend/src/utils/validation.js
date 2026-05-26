/*
 * validation.js
 * Helper utilities for validating pricing API requests.
 * Provides reusable functions to check required fields, date format,
 * part existence, and business rule validation (e.g., tubeless tyre with compatible rim).
 */

/**
 * Validate that the request body contains a valid date string and a non‑empty parts array.
 * @param {object} body - Express request body
 * @returns {{ valid: boolean, error?: string }}
 */
function validateRequestBody(body) {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be a JSON object.' };
  }
  const { date, parts } = body;
  if (!date) {
    return { valid: false, error: 'Missing required field: date.' };
  }
  if (!parts || !Array.isArray(parts) || parts.length === 0) {
    return { valid: false, error: 'Missing required field: parts (non‑empty array).' };
  }
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return { valid: false, error: 'Invalid date format.' };
  }
  return { valid: true };
}

/**
 * Business rule: Tubeless tyre requires a tubeless compatible rim.
 * @param {string[]} parts - array of part IDs selected by the user
 * @returns {{ valid: boolean, error?: string }}
 */
function validateCombination(parts) {
  const hasTubelessTyre = parts.includes('tubeless_tyre');
  const hasCompatibleRim = parts.includes('tubeless_compatible');
  if (hasTubelessTyre && !hasCompatibleRim) {
    return { valid: false, error: 'Tubeless tyres require compatible rims.' };
  }
  return { valid: true };
}

module.exports = { validateRequestBody, validateCombination };
