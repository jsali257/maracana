import React from 'react';
import { Music, Mic2, Disc, Sparkles, Calendar, Phone, ChevronRight } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';

interface LiveEntertainmentProps {
  onOpenReservation: () => void;
}

export const LiveEntertainment: React.FC<LiveEntertainmentProps> = ({ onOpenReservation }) => {
  const entertainmentNights = [
    {
      title: "Viernes de Banda & Norteño",
      day: "Every Friday Night",
      time: "9:30 PM – 1:30 AM",
      genre: "Regional Mexican & Live Bands",
      desc: "Live brass, energetic accordions, and the finest Regional Mexican sounds in Hidalgo. Dance, celebrate, and sing along to classic Corridos and Banda favorites.",
      badge: "Friday Live Music",
      accent: "text-emerald-400",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Saturday DJ & Live Band Fusion",
      day: "Every Saturday Night",
      time: "Live Music, DJs & Liga MX",
      genre: "Latin Beats, Reggaeton & Cumbia",
      desc: "Following our Saturday Liga MX soccer watch parties, the venue turns up the heat with high-energy resident DJs and guest live bands to keep the party pumping until 2:00 AM.",
      badge: "Saturday Nightlife",
      accent: "text-amber-400",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Thursday DJ Karaoke & 50% Off Apps",
      day: "Every Thursday Night",
      time: "8:00 PM – 12:00 AM",
      genre: "Karaoke, Hits & Half-Price Food",
      desc: "Take the main stage microphone! Sing your favorite rock, country, tejano, and pop hits while indulging in 50% off all appetizers like our Triple Play and loaded tots.",
      badge: "Thursday DJ Karaoke",
      accent: "text-purple-400",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="entertainment" className="py-20 bg-neutral-950 relative overflow-hidden border-t border-neutral-900">
      {/* Glow backgrounds */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest">
            <Music className="w-3.5 h-3.5" />
            <span>Hidalgo's Live Stage & Nightlife</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-none">
            Live Music & <span className="text-purple-400">Entertainment</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg font-body">
            From the authentic sounds of Banda and Norteño to DJ karaoke and Saturday club beats, El Maracaná comes alive after dark.
          </p>
        </div>

        {/* 3 Featured Nightlife Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {entertainmentNights.map((night, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all overflow-hidden flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden border-b border-neutral-800">
                  <img
                    src={night.image}
                    alt={night.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-neutral-950/90 text-white border border-neutral-700">
                      {night.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-bold bg-neutral-950/80 px-2.5 py-1 rounded-md border border-neutral-800">
                      {night.day}
                    </span>
                    <span className="text-neutral-300 font-semibold bg-neutral-900/80 px-2 py-1 rounded-md">
                      {night.time}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-400">
                    {night.genre}
                  </div>
                  <h3 className="font-display text-2xl font-black uppercase text-white group-hover:text-purple-300 transition-colors">
                    {night.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-body leading-relaxed">
                    {night.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  id={`book-nightlife-${idx}`}
                  onClick={onOpenReservation}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>Reserve Table for this Night</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Private Party & Table Reservations Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-display text-2xl font-black uppercase text-white">
              Planning a Birthday, VIP Watch Party, or Group Celebration?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400">
              Host your next group event at El Maracaná. We offer custom party platters, bottle service reservations, and prime seating.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              id="private-party-reserve-btn"
              onClick={onOpenReservation}
              className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25 cursor-pointer transition-all"
            >
              Book Group VIP Seating
            </button>
            <a
              id="private-party-call-btn"
              href={`tel:${VENUE_INFO.phoneRaw}`}
              className="px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>(956) 322-8814</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
