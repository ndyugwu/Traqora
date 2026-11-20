package com.example.booking;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class PaymentServiceTest {

    @Test
    public void testPreventPaymentReplay() {
        PaymentService service = new PaymentService();
        String bookingId = "BOOK-001";
        String txRef = "TX-12345";

        boolean firstPayment = service.processPayment(bookingId, txRef);
        assertTrue(firstPayment, "First payment attempt should succeed");

        boolean secondPayment = service.processPayment(bookingId, txRef);
        assertFalse(secondPayment, "Second payment attempt with the same transaction reference should be rejected (replay prevention)");
    }

    @Test
    public void testDifferentBookingCannotReuseTransactionReference() {
        PaymentService service = new PaymentService();
        String txRef = "TX-SHARED";

        boolean payment1 = service.processPayment("BOOK-A", txRef);
        assertTrue(payment1, "Payment for booking A should succeed");

        boolean payment2 = service.processPayment("BOOK-B", txRef);
        assertFalse(payment2, "Booking B cannot reuse transaction reference bound to booking A");
    }

    @Test
    public void testValidationArguments() {
        PaymentService service = new PaymentService();
        assertThrows(IllegalArgumentException.class, () -> service.processPayment(null, "TX-1"));
        assertThrows(IllegalArgumentException.class, () -> service.processPayment("BOOK-1", null));
    }
}
