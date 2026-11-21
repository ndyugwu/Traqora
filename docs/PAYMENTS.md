# Payment Replay Prevention

To prevent payment replay across bookings, each payment reference or authorization is bound to a single booking transaction using persistent storage checks in the smart contract. Re-submitting a previously used payment reference or calling pay multiple times with the same authorization/reference will be rejected with a `PaymentReplay` error (or `AlreadyPaid` depending on state checks).

## Operational Guidelines
- Ensure unique payment identifiers are generated per checkout session.
- Client applications should handle `PaymentReplay` and `AlreadyPaid` contract errors gracefully by verifying the booking status instead of retrying the identical payment authorization.
