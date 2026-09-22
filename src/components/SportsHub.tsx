import React from 'react';
import { Tv, Trophy, Flame, Shield, Volume2, Beer, Users, ChevronRight, CheckCircle2 } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';

interface SportsHubProps {
  onOpenReservation: () => void;
}

export const SportsHub: React.FC<SportsHubProps> = ({ onOpenReservation }) => {
  const leagues = [
    {
      name: "NFL & NFL RedZone",
      tag: "Every Sunday & Monday",
      desc: "Watch every touchdown from every game around the country live on RedZone, plus Thursday Night, Sunday Night, and Monday Night Football.",
      accent: "from-amber-500/20 to-transparent",
      icon: Trophy
    },
    {
      name: "Liga MX & UEFA Champions League",
      tag: "Live Soccer Headquarters",
      desc: "From El Clásico Nacional to Saturday night matchdays, feel the raw stadium energy, live chants, and ice-cold micheladas.",
      accent: "from-emerald-500/20 to-transparent",
      icon: Flame
    },
    {
      name: "UFC & Championship Boxing",
      tag: "Pay-Per-View Main Cards",
      desc: "Experience high-stakes championship bouts and explosive knockouts on our synchronized big screens with fight-night volume.",
      accent: "from-red-500/20 to-transparent",
      icon: Shield
    },
    {
      name: "College Football & NCAA Basketball",
      tag: "Saturdays & March Madness",
      desc: "Cheer on Texas, Texas A&M, Big 12, SEC, and tournament basketball with your friends, family, and game day snacks.",
      accent: "from-blue-500/20 to-transparent",
      icon: Tv
    }
  ];

  const experiencePoints = [
    { title: "15+ 4K Ultra HD Displays", desc: "Positioned so every table, booth, and bar stool has an unobstructed view of the action." },
    { title: "Dedicated Audio Zones", desc: "Immersive stadium audio pumped directly for the biggest marquee matchups of the day." },
    { title: "Game Day Sharing Buckets", desc: "Ice-cold 5-bottle beer buckets and draft towers ready for your watch party crew." },
    { title: "Family & Lunch Friendly", desc: "Welcoming daytime environment for family lunches, after-work meals, and weekend game viewing." },
  ];

  return (
    <section id="sports" className="py-20 bg-neutral-900/40 relative overflow-hidden border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Tv className="w-3.5 h-3.5" />
            <span>The Rio Grande Valley's Ultimate Game Day</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-none">
            The Maracaná <span className="text-amber-400">Sports Experience</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg font-body">
            Named after the world's most legendary soccer arena, El Maracaná brings electric stadium energy right here to Hidalgo, Texas.
          </p>
        </div>

        {/* 4 League Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {leagues.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-neutral-950/80 border border-neutral-800/80 p-6 flex flex-col justify-between hover:border-neutral-700 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-black uppercase text-white group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-body leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stadium Atmosphere Feature Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                Wall-to-Wall Sports Coverage
              </span>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white leading-none">
                Never Miss a Touchdown, Goal, or Knockout
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base font-body">
                Whether you're stopping by for weekday lunch with coworkers, grabbing $0.99 tacos on Tuesday, or settling in for an 8-hour Sunday NFL marathon with RedZone, our friendly staff and electric sports ambiance make every visit feel like front-row stadium seats.
              </p>

              {/* Checkpoints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {experiencePoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{pt.title}</h4>
                      <p className="text-xs text-neutral-400 leading-snug">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  id="sports-reserve-table-btn"
                  onClick={onOpenReservation}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20 cursor-pointer transition-all flex items-center gap-2"
                >
                  <span>Book Game Day Table</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <a
                  id="sports-events-link"
                  href="#events"
                  className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 transition-colors"
                >
                  Check Game Schedule
                </a>
              </div>
            </div>

            {/* Visual right side */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-neutral-700/80 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80"
                  alt="Sports Bar Screens & Action"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">NFL REDZONE</span>
                    <p className="text-xs font-bold text-white">Commercial-Free Football Every Sunday</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-amber-500 text-neutral-950 text-[10px] font-black">
                    ALL DAY
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
