import { Router } from 'express';
import { webhookIdempotency } from '../../middleware/webhookIdempotency';
import { logger } from '../../utils/logger';

const router = Router();

router.post('/stripe', webhookIdempotency(), async (req, res) => {
  try {
    const event = req.body;
    logger.info('Processing stripe webhook event', { type: event?.type, id: event?.id });
    res.status(200).json({ received: true });
  } catch (error) {
    logger.error('Webhook processing failed', { error });
    res.status(500).json({ success: false, error: 'Internal webhook error' });
  }
});

export default router;
