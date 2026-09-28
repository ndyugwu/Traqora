const { checkAndStoreIdempotency } = require('./idempotency');

/**
 * Handles incoming webhooks idempotently.
 * @param {Object} req - Request object containing headers and body
 * @param {Object} res - Response object
 */
function handleWebhook(req, res) {
  const webhookId = req.headers['x-webhook-id'] || (req.body && req.body.id);
  
  const idempotencyResult = checkAndStoreIdempotency(webhookId);
  if (idempotencyResult.error) {
    return res.status(400).json({ error: idempotencyResult.error });
  }
  
  if (idempotencyResult.duplicate) {
    return res.status(200).json({ status: 'ignored', reason: 'duplicate webhook' });
  }
  
  // Process valid non-duplicate webhook event
  return res.status(200).json({ status: 'success', processed: true });
}

module.exports = {
  handleWebhook
};
