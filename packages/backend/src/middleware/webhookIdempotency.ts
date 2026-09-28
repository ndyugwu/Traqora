import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../db/dataSource';
import { IdempotencyKey } from '../db/entities/IdempotencyKey';
import { logger } from '../utils/logger';

/**
 * Middleware to ensure webhook events are processed idempotently.
 * Checks if the incoming webhook event ID has already been processed.
 * 
 * Inputs:
 * - req.body.id or req.headers['stripe-signature'] / custom event ID headers
 * Outputs:
 * - Proceeds to next() if novel, or returns 200 OK / 409 Conflict if duplicate depending on contract specification.
 * Error cases:
 * - Missing event ID: returns 400 Bad Request.
 * - Database error: returns 500 Internal Server Error.
 */
export const webhookIdempotencyMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const eventId =
      req.body?.id ||
      req.headers['stripe-event-id'] ||
      req.headers['x-webhook-event-id'] ||
      (req.body?.data && req.body.data.id);

    if (!eventId || typeof eventId !== 'string') {
      // If no explicit event ID header or body id is found, we might fall back or require it.
      // For strict idempotency contract, we require an event identifier.
      res.status(400).json({
        success: false,
        error: {
          code: 'WEBHOOK_EVENT_ID_MISSING',
          message: 'Webhook event ID is required for idempotency verification.',
        },
      });
      return;
    }

    const idempotencyRepo = AppDataSource.getRepository(IdempotencyKey);
    const keyName = `webhook:${eventId}`;

    const existing = await idempotencyRepo.findOne({ where: { key: keyName } });
    if (existing) {
      logger.info('Duplicate webhook event received, skipping processing', { eventId });
      res.status(200).json({
        success: true,
        duplicate: true,
        message: 'Event already processed idempotently.',
      });
      return;
    }

    // Record idempotency key tentatively or let the service finalize it
    const record = idempotencyRepo.create({
      key: keyName,
      path: req.path,
      method: req.method,
      statusCode: 200,
      responseBody: JSON.stringify({ received: true }),
    });
    await idempotencyRepo.save(record);

    next();
  } catch (error: any) {
    logger.error('Error in webhook idempotency middleware', { error: error.message });
    res.status(500).json({
      success: false,
      error: {
        code: 'WEBHOOK_IDEMPOTENCY_ERROR',
        message: 'Internal server error verifying webhook idempotency.',
      },
    });
  }
};
