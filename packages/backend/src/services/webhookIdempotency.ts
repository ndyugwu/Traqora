import { AppDataSource } from '../db/dataSource';
import { WebhookEvent } from '../db/entities/WebhookEvent';
import { logger } from '../utils/logger';

export interface ProcessWebhookOptions {
  eventId: string;
  provider: string;
  eventType: string;
  handler: () => Promise<void>;
}

/**
 * Ensures webhook processing is idempotent by tracking processed event IDs.
 * If the event has already been successfully handled, it skips execution and returns successfully.
 */
export async function processIdempotentWebhook(options: ProcessWebhookOptions): Promise<{ processed: boolean }> {
  const { eventId, provider, eventType, handler } = options;
  const repo = AppDataSource.getRepository(WebhookEvent);

  const existing = await repo.findOne({ where: { eventId } });
  if (existing) {
    logger.info('Duplicate webhook event received, skipping execution idempotently', {
      eventId,
      provider,
      eventType,
    });
    return { processed: false };
  }

  await handler();

  try {
    const record = repo.create({
      eventId,
      provider,
      eventType,
      status: 'processed',
    });
    await repo.save(record);
  } catch (error: any) {
    // If concurrent insert occurred, treat as idempotent duplicate
    if (error.code === 'SQLITE_CONSTRAINT' || error.code === '23505' || (error.message && error.message.includes('UNIQUE constraint failed'))) {
      logger.info('Concurrent duplicate webhook event detected during save, skipping', {
        eventId,
        provider,
      });
      return { processed: false };
    }
    throw error;
  }

  return { processed: true };
}
