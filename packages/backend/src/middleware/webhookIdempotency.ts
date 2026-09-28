import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../db/dataSource';
import { IdempotencyKey } from '../db/entities/IdempotencyKey';
import { logger } from '../utils/logger';

export interface WebhookIdempotencyOptions {
  headerName?: string;
  expirySeconds?: number;
}

export const webhookIdempotency = (options: WebhookIdempotencyOptions = {}) => {
  const headerName = options.headerName || 'stripe-signature';
  const expirySeconds = options.expirySeconds || 86400;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sigHeader = req.headers[headerName.toLowerCase()] as string;
      const eventId = req.body?.id || sigHeader;

      if (!eventId) {
        res.status(400).json({
          success: false,
          error: {
            code: 'WEBHOOK_IDEMPOTENCY_MISSING',
            message: 'Webhook event ID or signature header is missing.',
          },
        });
        return;
      }

      const idempotencyRepo = AppDataSource.getRepository(IdempotencyKey);
      const existing = await idempotencyRepo.findOne({ where: { idempotencyKey: eventId } });

      if (existing) {
        logger.info('Duplicate webhook detected, returning cached success response', { eventId });
        res.status(200).json({
          success: true,
          duplicate: true,
          message: 'Webhook event already processed idempotently',
        });
        return;
      }

      const expiresAt = new Date(Date.now() + expirySeconds * 1000);
      await idempotencyRepo.save(
        idempotencyRepo.create({
          idempotencyKey: eventId,
          path: req.path,
          method: req.method,
          requestPayload: JSON.stringify(req.body || {}),
          responsePayload: JSON.stringify({ success: true }),
          statusCode: 200,
          expiresAt,
        }),
      );

      next();
    } catch (error) {
      logger.error('Error in webhookIdempotency middleware', { error });
      next(error);
    }
  };
};
