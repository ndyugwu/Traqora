# Webhooks Idempotency Documentation

## Overview
Webhook handlers in Traqora support idempotency to prevent duplicate processing of the same event delivered multiple times by webhook providers.

## Contract
- **Input**: `eventId` (String) extracted from webhook headers or payload.
- **Output**: Boolean (`true` if duplicate, `false` if new).
- **Error Handling**: Throws an error if `eventId` is missing or invalid.

## Example Usage
```javascript
const { checkAndStoreEventId } = require('./idempotency');

function handleWebhook(req, res) {
  const eventId = req.headers['x-traqora-event-id'];
  try {
    if (checkAndStoreEventId(eventId)) {
      return res.status(200).send({ status: 'already processed' });
    }
    // Process webhook payload...
    return res.status(200).send({ status: 'processed' });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
}
```
