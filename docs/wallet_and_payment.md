# Wallet and Payment

## Payment Replay Prevention

To prevent payment replay attacks across bookings, payment authorization and transaction references are cryptographically bound to a specific booking ID per passenger. Once a payment action is committed for a booking, attempting to reuse the payment state or replay the transaction is rejected by contract storage checks.
