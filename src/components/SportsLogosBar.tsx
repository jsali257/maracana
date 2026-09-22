import React from 'react';
import { Tv } from 'lucide-react';
import { ParallaxCorners } from './ParallaxCorners';

export const SportsLogosBar: React.FC = () => {
  const sports = [
    { name: 'NFL Football', sub: 'Sunday Ticket & RedZone', logo: '/SportLogos/NFL.svg', alt: 'NFL logo' },
    { name: 'Liga MX', sub: 'All Matches & El Clásico', logo: '/SportLogos/LigaMX.svg', alt: 'Liga MX logo' },
    { name: 'UFC & Boxing', sub: 'Championship Fight Nights', logo: '/SportLogos/ufc.png', alt: 'UFC logo' },
    { name: 'UEFA Champions', sub: 'European Nights', logo: '/SportLogos/UEFALogo.webp', alt: 'UEFA Champions League logo' },
    { name: 'MLB Baseball', sub: 'Regular Season & Playoffs', logo: '/SportLogos/MLB.webp', alt: 'MLB logo' },
    { name: 'NBA & NCAA', sub: 'Primetime Games', logo: '/SportLogos/nba.png', alt: 'NBA logo' },
  ];

  return (
    <section id="sports" className="relative overflow-hidden bg-white border-y border-stone-200 py-14 sm:py-16">
      {/* Soft brand-colored glow behind the title */}
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-225 h-80 rounded-full bg-red-500/10 blur-3xl" />

      {/* Decorative football corner graphics with a subtle scroll parallax */}
      <ParallaxCorners
        topLeftSrc="/graphics/football-corner-tl.png"
        bottomRightSrc="/graphics/football-corner-br.png"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 text-white shadow-sm text-xs font-bold uppercase tracking-widest">
            <Tv className="w-3.5 h-3.5 text-amber-400" />
            <span>Live on Our Screens</span>
          </div>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-black uppercase text-stone-900 tracking-tight leading-[0.95]">
            Sports We <span className="text-red-600">Broadcast</span>
          </h2>
          <div aria-hidden className="flex items-center justify-center gap-2">
            <span className="h-1 w-10 rounded-full bg-stone-900" />
            <span className="h-1 w-4 rounded-full bg-red-600" />
            <span className="h-1 w-2 rounded-full bg-amber-500" />
          </div>
        </div>

        {/* Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
          {sports.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-stone-300"
            >
              <div className="h-16 w-full flex items-center justify-center mb-3">
                <img
                  src={item.logo}
                  alt={item.alt}
                  loading="lazy"
                  draggable={false}
                  className="max-h-full max-w-full object-contain select-none"
                />
              </div>
              <span className="text-sm font-extrabold text-stone-900 block leading-tight">
                {item.name}
              </span>
              <span className="text-[11px] text-stone-600 block mt-0.5 leading-snug text-balance">
                {item.sub}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
