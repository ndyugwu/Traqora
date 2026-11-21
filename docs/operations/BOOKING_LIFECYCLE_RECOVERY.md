# Booking Lifecycle Recovery & Payment Replay Prevention

## Overview
To prevent payment replay attacks across bookings, transaction references and payment authorizations are strictly bound to a single unique `booking_id` at the time of signing/escrow.

## Replay Prevention Rules
1. **One-to-One Binding**: Each successful payment hash or Stellar transaction authorization can only be claimed once across the system.
2. **Database Constraints**: Unique constraints on transaction reference identifiers prevent duplicate association in the ledger.
3. **Smart Contract Verification**: The Soroban booking contract verifies that the payment token authorization has not been consumed or referenced by prior booking states.

## Recovery & Error Handling
- If a payment reference is submitted for a second booking, the backend rejects the request with a `PAYMENT_ALREADY_USED` error code.
- Operators can inspect disputed replay attempts via the booking lifecycle logs.
