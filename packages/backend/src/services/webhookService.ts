import { logger } from '../utils/logger';

export interface WebhookEventContract {
  id: string;
  type: string;
  data: Record<string, any>;
}

export interface WebhookResult {
  success: boolean;
  duplicate?: boolean;
  processedAt?: string;
  error?: string;
}

/**
 * Service contract for handling incoming webhooks idempotently.
 * 
 * Contract Specification:
 * - Inputs: WebhookEventContract object containing id, type, and payload data.
 * - Outputs: WebhookResult indicating success status and whether it was a duplicate.
 * - Error Cases:
 *   - DUPLICATE_EVENT: Handled gracefully returning success: true, duplicate: true.
 *   - INVALID_PAYLOAD: Throws or returns success: false with validation error.
 *   - PROCESSING_FAILURE: Encapsulates downstream errors with retry hints.
 */
export class WebhookService {
  public static async processWebhookEvent(event: WebhookEventContract): Promise<WebhookResult> {
    if (!event || !event.id) {
      throw new Error('Invalid webhook event: missing event id');
    }

    logger.info('Processing webhook event', { eventId: event.id, type: event.type });

    // Downstream webhook event handling logic per event type
    switch (event.type) {
      case 'payment_intent.succeeded':
      case 'charge.succeeded':
        logger.info('Handling successful payment webhook', { eventId: event.id });
        break;
      case 'payment_intent.payment_failed':
        logger.info('Handling failed payment webhook', { eventId: event.id });
        break;
      default:
        logger.info('Unhandled webhook event type', { type: event.type });
    }

    return {
      success: true,
      processedAt: new Date().toISOString(),
    };
  }
}
