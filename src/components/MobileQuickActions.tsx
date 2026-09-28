import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { callToReserve } from '../utils/reservation';

export const MobileQuickActions: React.FC = () => (
  <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-stone-900/95 border-t border-stone-800 backdrop-blur-md px-3 py-2 flex items-center justify-between gap-2 shadow-lg">
    <a
      id="mobile-bottom-call-btn"
      href={`tel:${VENUE_INFO.phoneRaw}`}
      className="flex-1 py-2 rounded-xl text-xs font-bold bg-stone-800 text-white border border-stone-700 flex items-center justify-center gap-1.5"
    >
      <Phone className="w-3.5 h-3.5 text-emerald-400" />
      <span>Call</span>
    </a>
    <a
      id="mobile-bottom-directions-btn"
      href={VENUE_INFO.googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 py-2 rounded-xl text-xs font-bold bg-stone-800 text-white border border-stone-700 flex items-center justify-center gap-1.5"
    >
      <MapPin className="w-3.5 h-3.5 text-amber-400" />
      <span>Directions</span>
    </a>
    <button
      id="mobile-bottom-reserve-btn"
      onClick={callToReserve}
      className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-500 text-stone-950 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
    >
      <Phone className="w-3.5 h-3.5" />
      <span>Reserve</span>
    </button>
  </div>
);
