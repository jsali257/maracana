import { VENUE_INFO } from '../data/venueData';

// The online reservation form is on hold for now — every "Reserve" CTA site-wide
// dials the venue directly instead. Centralized here so every page that offers a
// "Reserve" action calls the venue the same way.
export function callToReserve() {
  window.location.href = `tel:${VENUE_INFO.phoneRaw}`;
}
