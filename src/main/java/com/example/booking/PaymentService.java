package com.example.booking;

import java.util.HashSet;
import java.util.Set;

public class PaymentService {
    private final Set<String> usedTransactionReferences = new HashSet<>();

    public synchronized boolean processPayment(String bookingId, String transactionReference) {
        if (transactionReference == null || transactionReference.trim().isEmpty()) {
            throw new IllegalArgumentException("Transaction reference cannot be null or empty");
        }
        if (bookingId == null || bookingId.trim().isEmpty()) {
            throw new IllegalArgumentException("Booking ID cannot be null or empty");
        }
        if (usedTransactionReferences.contains(transactionReference)) {
            return false;
        }
        usedTransactionReferences.add(transactionReference);
        return true;
    }
}
