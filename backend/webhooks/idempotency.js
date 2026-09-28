/**
 * Idempotent Webhook Handler Module
 * Contract definition, inputs, outputs, and error cases for webhook deduplication.
 */

const processedEvents = new Map();

/**
 * Checks if a webhook event has already been processed and marks it if not.
 * 
 * Inputs:
 * - eventId (string): Unique identifier for the webhook event (e.g. from headers or payload ID).
 * 
 * Outputs:
 * - boolean: true if the event was already processed (duplicate), false if it is new.
 * 
 * Error Cases:
 * - Throws an Error if eventId is missing or invalid.
 */
function checkAndStoreEventId(eventId) {
  if (!eventId || typeof eventId !== 'string') {
    throw new Error('Invalid or missing eventId for idempotency check');
  }
  if (processedEvents.has(eventId)) {
    return true;
  }
  processedEvents.set(eventId, Date.now());
  return false;
}

/**
 * Clears the internal store (useful for testing).
 */
function clearIdempotencyStore() {
  processedEvents.clear();
}

module.exports = {
  checkAndStoreEventId,
  clearIdempotencyStore,
};
