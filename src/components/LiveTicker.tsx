import React from 'react';
import { Flame, Trophy, Sparkles, Music, Beer } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { getVenueStatus } from '../utils/timeHelpers';

export const LiveTicker: React.FC = () => {
  const status = getVenueStatus();

  const tickerItems = [
    { icon: Sparkles, text: `HAPPY HOUR MON–FRI 3–7 PM: $2.99 16oz DRAFT BEER & $4.99 MARGARITAS`, color: "text-amber-400" },
    { icon: Trophy, text: "NFL SUNDAY TICKET & NFL REDZONE: WATCH EVERY TOUCHDOWN LIVE ACROSS 15+ 4K SCREENS", color: "text-emerald-400" },
    { icon: Flame, text: "WEEKLY SPECIALS: $7.99 BURGER MONDAYS • $0.99 TACO TUESDAYS • $0.69 WING WEDNESDAYS", color: "text-red-400" },
    { icon: Music, text: "LIVE MUSIC FRIDAYS: BANDA & NORTEÑO EN VIVO • THURSDAY DJ KARAOKE (50% OFF APPS)", color: "text-purple-400" },
    { icon: Beer, text: "LIGA MX CLÁSICOS & SATURDAY NIGHT ENTERTAINMENT • HIDALGO, TX", color: "text-cyan-400" }
  ];

  return (
    <div className="bg-neutral-900/90 border-y border-neutral-800 py-2.5 overflow-hidden relative shadow-inner">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />
      
      <div className="animate-marquee items-center gap-12 whitespace-nowrap">
        {/* Render twice for continuous loop */}
        {[...tickerItems, ...tickerItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wider font-display uppercase text-neutral-300">
              <Icon className={`w-4 h-4 ${item.color}`} />
              <span>{item.text}</span>
              <span className="text-neutral-700 font-normal ml-3">/ / /</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
