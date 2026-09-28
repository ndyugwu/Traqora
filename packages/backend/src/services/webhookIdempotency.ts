import { AppDataSource } from '../db/dataSource';
import { WebhookEvent } from '../db/entities/WebhookEvent';
import { logger } from '../utils/logger';

export async function isWebhookEventProcessed(eventId: string): Promise<boolean> {
  if (!eventId) return false;
  const repo = AppDataSource.getRepository(WebhookEvent);
  const existing = await repo.findOne({ where: { eventId } });
  return !!existing;
}

export async function recordWebhookEventProcessed(eventId: string): Promise<void> {
  if (!eventId) return;
  const repo = AppDataSource.getRepository(WebhookEvent);
  try {
    const event = repo.create({ eventId, status: 'processed' });
    await repo.save(event);
  } catch (err) {
    logger.warn('Failed to record processed webhook event or duplicate caught', { eventId, err });
  }
}
