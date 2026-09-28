# Webhook Idempotency & Processing Contract

## Overview
Traqora webhooks handle incoming asynchronous events from payment processors (Stripe, etc.) and partner systems. Because webhook delivery retries can result in duplicate network requests, all webhook endpoints adhere to a strict **idempotency contract**.

## Contract Specification

### Inputs
- **Headers or Body**: Each incoming webhook request must provide a unique event identifier via `req.body.id`, `req.headers['stripe-event-id']`, `req.headers['x-webhook-event-id']`, or `req.body.data.id`.

### Outputs & Responses
- **Novel Events (`200 OK`)**: Processed successfully. The event ID is recorded in the idempotency store (`IdempotencyKey` entity with key prefix `webhook:`).
- **Duplicate Events (`200 OK` with `{ duplicate: true }`)**: Skipped gracefully to prevent duplicate business actions (e.g., double-crediting bookings).
- **Missing Identifier (`400 Bad Request`)**: Returned when no event ID can be extracted.
- **Internal Error (`500 Internal Server Error`)**: Returned upon unexpected database or downstream failures.

## Operator Guidance & Configuration
Ensure that webhook signing secrets and reverse proxy headers (e.g., `X-Forwarded-For`, proxy trust) are correctly configured so that event delivery metadata remains intact.
