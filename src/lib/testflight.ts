// The public TestFlight invite link. There is no live link yet (PRODUCT.md,
// "Evidence on Hand"), so every TestFlight call to action renders only when
// this is set — a hidden CTA beats a stub that goes nowhere. Public by
// nature: the URL *is* the invitation, so NEXT_PUBLIC_ is correct here.
export const TESTFLIGHT_URL = process.env.NEXT_PUBLIC_TESTFLIGHT_URL || null;
