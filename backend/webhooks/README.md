# Backend Webhooks & Idempotency

## Overview
Webhook handlers in Traqora are idempotent to ensure that duplicate webhook deliveries from third-party providers do not result in duplicate state changes or processing.

## Contract
- **Input**: Requires a unique webhook identifier passed via the `X-Webhook-ID` header or within the event body payload `id` field.
- **Output**: 
  - Success (New): `{ status: 'success', processed: true }` with HTTP 200.
  - Duplicate: `{ status: 'ignored', reason: 'duplicate webhook' }` with HTTP 200.
  - Error: `{ error: '...' }` with HTTP 400.

## Operator & Contributor Guide
Ensure any new webhook producer provides a reliable unique identifier header so idempotency checks function correctly.
