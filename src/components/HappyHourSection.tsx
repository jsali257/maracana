import React from 'react';
import { Sparkles, Clock, Beer, Wine, Check, Calendar, Phone } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { getVenueStatus } from '../utils/timeHelpers';

interface HappyHourSectionProps {
  onOpenReservation: () => void;
}

export const HappyHourSection: React.FC<HappyHourSectionProps> = ({ onOpenReservation }) => {
  const status = getVenueStatus();

  return (
    <section id="happy-hour" className="py-16 bg-neutral-900/40 border-y border-neutral-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="rounded-3xl bg-neutral-900/80 border border-neutral-800 p-6 sm:p-10 lg:p-12 shadow-2xl relative">
          
          {/* Header row with Status Badge */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6 mb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-neutral-800 text-amber-400 border border-neutral-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Monday – Friday | 3:00 PM – 7:00 PM
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
                El Maracaná <span className="text-amber-400">Happy Hour</span>
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base font-body">
                The best after-work and early-evening drink specials in Hidalgo, Texas.
              </p>
            </div>

            {/* Live Indicator Box */}
            <div className="shrink-0 flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${status.isHappyHour ? 'bg-emerald-400 animate-ping' : 'bg-neutral-600'}`} />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">Current Status</span>
                  <span className={`text-sm font-black uppercase font-display ${status.isHappyHour ? 'text-emerald-400' : 'text-neutral-300'}`}>
                    {status.isHappyHour ? 'HAPPY HOUR IS LIVE NOW!' : 'Starts 3:00 PM Mon–Fri'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2 Big Featured Cards: Draft Beer & Margaritas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
            
            {/* 16 oz Draft Beer Card */}
            <div className="rounded-2xl bg-neutral-950/80 border border-neutral-800 p-6 flex flex-col sm:flex-row items-center gap-6 group hover:border-amber-500/50 transition-all">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden shrink-0 border border-neutral-800 relative">
                <img
                  src="https://images.unsplash.com/photo-1538488881522-4321453a9d70?auto=format&fit=crop&w=400&q=80"
                  alt="16 oz Draft Beer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 left-2 bg-amber-500 text-neutral-950 text-[10px] font-black px-2 py-0.5 rounded">
                  DRAFT
                </div>
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Frosty Tap Selection</span>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
                  16 oz Draft Beer
                </h3>
                <div className="font-display text-4xl font-black text-amber-400">
                  $2.99
                </div>
                <p className="text-xs text-neutral-400 font-body">
                  Ice-cold 16 oz stadium drafts including domestic favorites (Michelob Ultra, Bud Light, Miller Lite) and ice-cold Mexican imports (Dos Equis, Modelo Especial).
                </p>
              </div>
            </div>

            {/* Margaritas Card */}
            <div className="rounded-2xl bg-neutral-950/80 border border-neutral-800 p-6 flex flex-col sm:flex-row items-center gap-6 group hover:border-emerald-500/50 transition-all">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden shrink-0 border border-neutral-800 relative">
                <img
                  src="https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=400&q=80"
                  alt="House Margaritas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 left-2 bg-emerald-500 text-neutral-950 text-[10px] font-black px-2 py-0.5 rounded">
                  COCKTAIL
                </div>
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Handcrafted Spirits</span>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
                  House Margaritas
                </h3>
                <div className="font-display text-4xl font-black text-emerald-400">
                  $4.99
                </div>
                <p className="text-xs text-neutral-400 font-body">
                  Crafted with 100% blue agave tequila, fresh-squeezed lime juice, and triple sec. Enjoy on the rocks or frozen with a zesty Tajín or sea-salt rim.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Callout & Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs sm:text-sm text-neutral-300">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                Available Monday through Friday from <strong>3:00 PM to 7:00 PM</strong>. Pair with our appetizers or street tacos!
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                id="happy-hour-reserve-btn"
                onClick={onOpenReservation}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors cursor-pointer"
              >
                Reserve Bar Seats
              </button>
              <a
                id="happy-hour-call-btn"
                href={`tel:${VENUE_INFO.phoneRaw}`}
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>(956) 322-8814</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
