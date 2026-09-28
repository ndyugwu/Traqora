/**
 * Webhook Idempotency Module
 * Contract:
 * Inputs: webhookId (string), eventPayload (object)
 * Outputs: { processed: boolean, duplicate: boolean, error?: string }
 * Error cases: missing webhookId, storage failure.
 */

const processedWebhooks = new Set();

function checkAndStoreIdempotency(webhookId) {
  if (!webhookId || typeof webhookId !== 'string') {
    return { processed: false, duplicate: false, error: 'Invalid or missing webhookId' };
  }
  if (processedWebhooks.has(webhookId)) {
    return { processed: false, duplicate: true };
  }
  processedWebhooks.add(webhookId);
  return { processed: true, duplicate: false };
}

function clearProcessedWebhooks() {
  processedWebhooks.clear();
}

module.exports = {
  checkAndStoreIdempotency,
  clearProcessedWebhooks
};
