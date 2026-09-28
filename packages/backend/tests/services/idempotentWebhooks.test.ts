import { initDataSource, AppDataSource } from '../../src/db/dataSource';
import { isWebhookEventProcessed, recordWebhookEventProcessed } from '../../src/services/webhookIdempotency';

describe('Webhook Idempotency Service', () => {
  beforeAll(async () => {
    await initDataSource();
  });

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  it('detects unprocessed events and records them idempotently', async () => {
    const eventId = 'evt_test_12345';
    expect(await isWebhookEventProcessed(eventId)).toBe(false);

    await recordWebhookEventProcessed(eventId);
    expect(await isWebhookEventProcessed(eventId)).toBe(true);

    // Recording again should not throw
    await recordWebhookEventProcessed(eventId);
    expect(await isWebhookEventProcessed(eventId)).toBe(true);
  });
});
