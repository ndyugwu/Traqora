# Webhooks & Idempotency Guide

## Overview
Traqora backend webhook endpoints implement strict idempotency guarantees to prevent duplicate processing caused by event re-deliveries from payment providers like Stripe.

## Contract & Inputs/Outputs
- **Header:** `Stripe-Signature` (default) or event payload body `id`.
- **Happy Path:** If an event has not been processed previously, the request is recorded in the idempotency store and passed down to the handler.
- **Duplicate Path:** If the event has already been processed, the middleware short-circuits and returns a cached success payload (`duplicate: true`) with HTTP 200.
- **Failure Mode:** If neither the event ID nor signature header is present, the endpoint returns HTTP 400 with error code `WEBHOOK_IDEMPOTENCY_MISSING`.

## Operator Configuration
Configure expiry windows and header mappings via `WebhookIdempotencyOptions` when mounting the middleware.
