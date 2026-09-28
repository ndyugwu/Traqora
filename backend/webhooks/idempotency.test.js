const { checkAndStoreIdempotency, clearProcessedWebhooks } = require('./idempotency');

describe('Webhook Idempotency', () => {
  beforeEach(() => {
    clearProcessedWebhooks();
  });

  test('should process a new webhook successfully', () => {
    const result = checkAndStoreIdempotency('hook_123');
    expect(result.processed).toBe(true);
    expect(result.duplicate).toBe(false);
  });

  test('should detect duplicate webhooks', () => {
    checkAndStoreIdempotency('hook_123');
    const duplicateResult = checkAndStoreIdempotency('hook_123');
    expect(duplicateResult.processed).toBe(false);
    expect(duplicateResult.duplicate).toBe(true);
  });

  test('should handle missing webhookId as an error case', () => {
    const result = checkAndStoreIdempotency(null);
    expect(result.processed).toBe(false);
    expect(result.duplicate).toBe(false);
    expect(result.error).toBeDefined();
  });
});
