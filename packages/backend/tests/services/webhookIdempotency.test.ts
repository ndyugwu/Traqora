import { AppDataSource, initDataSource } from '../../src/db/dataSource';
import { WebhookEvent } from '../../src/db/entities/WebhookEvent';
import { processIdempotentWebhook } from '../../src/services/webhookIdempotency';

describe('Webhook Idempotency Service', () => {
  beforeAll(async () => {
    await initDataSource();
  });

  afterAll(async () => {
    if (AppDataSource.isInitialized) await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(WebhookEvent).clear();
  });

  it('processes a new webhook event successfully and records it', async () => {
    let executed = 0;
    const result = await processIdempotentWebhook({
      eventId: 'evt_123',
      provider: 'stripe',
      eventType: 'payment_intent.succeeded',
      handler: async () => {
        executed++;
      },
    });

    expect(result.processed).toBe(true);
    expect(executed).toBe(1);

    const stored = await AppDataSource.getRepository(WebhookEvent).findOne({ where: { eventId: 'evt_123' } });
    expect(stored).toBeTruthy();
    expect(stored?.provider).toBe('stripe');
  });

  it('skips execution for duplicate webhook events (idempotent behavior)', async () => {
    let executed = 0;
    const handler = async () => {
      executed++;
    };

    const first = await processIdempotentWebhook({
      eventId: 'evt_dup',
      provider: 'stripe',
      eventType: 'payment_intent.succeeded',
      handler,
    });
    expect(first.processed).toBe(true);
    expect(executed).toBe(1);

    const second = await processIdempotentWebhook({
      eventId: 'evt_dup',
      provider: 'stripe',
      eventType: 'payment_intent.succeeded',
      handler,
    });
    expect(second.processed).toBe(false);
    expect(executed).toBe(1); // Handler not called again
  });

  it('failure mode: does not record event if handler throws an error', async () => {
    let executed = 0;
    const handler = async () => {
      executed++;
      throw new Error('Processing failed');
    };

    await expect(
      processIdempotentWebhook({
        eventId: 'evt_fail',
        provider: 'stripe',
        eventType: 'payment_intent.succeeded',
        handler,
      }),
    ).rejects.toThrow('Processing failed');

    expect(executed).toBe(1);
    const stored = await AppDataSource.getRepository(WebhookEvent).findOne({ where: { eventId: 'evt_fail' } });
    expect(stored).toBeNull();

    // Retry should succeed and process correctly
    const retryResult = await processIdempotentWebhook({
      eventId: 'evt_fail',
      provider: 'stripe',
      eventType: 'payment_intent.succeeded',
      handler: async () => {
        executed++;
      },
    });
    expect(retryResult.processed).toBe(true);
    expect(executed).toBe(2);
  });
});
