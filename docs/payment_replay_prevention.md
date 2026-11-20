# Payment Replay Prevention

To prevent payment replay attacks across bookings, the booking contract binds authorization and transaction references to a specific booking ID and verifies that `amount_escrowed == 0` and `status == pending` before accepting any payment. Subsequent payment attempts for the same booking ID are rejected with an "Already paid or cancelled" error.
