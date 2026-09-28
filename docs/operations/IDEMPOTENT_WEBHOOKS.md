# Idempotent Webhook Handlers Contract & Guide

## Overview
Traqora backend webhook handlers implement strict idempotency guarantees to ensure that duplicate webhook deliveries (from Stripe, airline partners, or payment gateways) never result in duplicate state transitions or financial side effects.

## Contract Specification
- **Inputs**: `eventId` (unique identifier provided by webhook source), `provider`, `eventType`, and `handler` callback function.
- **Outputs**: `{ processed: boolean }` where `processed` is `true` if executed for the first time, or `false` if skipped due to prior successful processing.
- **Error Cases**: If the handler throws an error, the execution record is not persisted, allowing safe retries upon subsequent delivery attempts.

## Example Usage
```ts
import { processIdempotentWebhook } from '../services/webhookIdempotency';

await processIdempotentWebhook({
  eventId: event.id,
  provider: 'stripe',
  eventType: event.type,
  handler: async () => {
    // Business logic (e.g. fulfill booking)
  },
});
```
