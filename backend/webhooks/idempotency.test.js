const { checkAndStoreEventId, clearIdempotencyStore } = require('./idempotency');

describe('Webhook Idempotency Handler', () => {
  beforeEach(() => {
    clearIdempotencyStore();
  });

  test('happy path: first time event is processed returns false (not duplicate)', () => {
    const eventId = 'evt_12345';
    const isDuplicate = checkAndStoreEventId(eventId);
    expect(isDuplicate).toBe(false);
  });

  test('key failure mode: duplicate event returns true', () => {
    const eventId = 'evt_12345';
    expect(checkAndStoreEventId(eventId)).toBe(false);
    // Second attempt should be detected as duplicate
    expect(checkAndStoreEventId(eventId)).toBe(true);
  });

  test('error case: missing or invalid eventId throws error', () => {
    expect(() => checkAndStoreEventId('')).toThrow('Invalid or missing eventId');
    expect(() => checkAndStoreEventId(null)).toThrow('Invalid or missing eventId');
  });
});
