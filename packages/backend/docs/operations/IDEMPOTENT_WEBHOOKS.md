# Idempotent Webhook Handlers Contract & Operation

## Overview
Webhook handlers in Traqora are strictly idempotent. Each incoming webhook event carries a unique identifier (`id` in Stripe or custom payload headers). The backend records successfully processed event IDs in the persistent database (`webhook_events` table).

## Contract & Inputs/Outputs
- **Input**: Webhook HTTP request containing event payload and headers.
- **Output**: 
  - `200 OK` with `{ received: true }` (or domain-specific success) on first processing or duplicate replay.
  - `400 Bad Request` if signature verification or payload parsing fails.
- **Failure Modes**: 
  - Duplicate delivery: Handled gracefully by short-circuiting with `200 OK` without re-triggering business logic.
  - Database connectivity failure: Fails closed or retries according to standard upstream delivery semantics.

## Operator Guide
Operators can inspect processed webhook event logs via the `webhook_events` table to audit deliveries and trace retries.
