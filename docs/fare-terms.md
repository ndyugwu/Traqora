# Fare Terms & Cancellation Review Component

The `FareTermsReview` component presents applicable fare classes and cancellation policies before the traveler authorizes payment in the mobile booking checkout flow.

## Usage

```tsx
import { FareTermsReview } from '../booking/fare-terms';

<FareTermsReview
  fareClass="Economy Basic"
  cancellationPolicy="No refunds or changes allowed."
  nonRefundable={true}
/>
```
