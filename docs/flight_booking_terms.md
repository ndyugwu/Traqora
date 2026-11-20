# Flight Booking: Final Terms and Cancellation Review

## Overview
Before a traveler authorizes payment or completes a seat reservation, the flight booking system provides an explicit review step for applicable fare terms and cancellation policies.

## Methods
- `review_terms(env, flight_id)`: Inspects applicable fare and cancellation terms for the given flight.
  - Returns a tuple of symbols: `(fare_terms, cancellation_terms)`.
  - Standard values include `non_ref` for fare terms and `strict` for cancellation terms.
  - Validates that the flight ID is active and valid (rejecting `INVALID` with a clear assertion failure).

## Operational Guidelines
Clients and checkout frontends must call `review_terms` prior to invoking `reserve_seat` to ensure users are informed of cancellation rules and refund eligibility before signing payment authorization.