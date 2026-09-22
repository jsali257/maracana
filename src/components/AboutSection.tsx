import React from 'react';
import { ShieldCheck, Heart, Users, UtensilsCrossed, Trophy, Sparkles } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      title: "Stadium Passion",
      description: "Inspired by the iconic Maracanã Stadium, our venue channels raw sporting energy, club chants, and championship enthusiasm.",
      icon: Trophy
    },
    {
      title: "Family & Daytime Welcoming",
      description: "During lunchtime and afternoons, enjoy a relaxed, family-friendly dining room with fresh burgers, street tacos, and kids meals.",
      icon: Heart
    },
    {
      title: "Rio Grande Valley Hospitality",
      description: "Rooted in Hidalgo, Texas, we treat every guest like family with generous portions, fast service, and ice-cold drinks.",
      icon: Users
    },
    {
      title: "Scratch-Crafted Kitchen",
      description: "From our seasoned hand-pressed patties to scratch sauces and prepared micheladas, quality comes first.",
      icon: UtensilsCrossed
    }
  ];

  return (
    <section id="about" className="py-20 bg-neutral-950 relative overflow-hidden border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About El Maracaná</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none">
              Hidalgo's Home for <br />
              <span className="text-amber-400">Sports, Flavor & Nightlife</span>
            </h2>

            <p className="text-neutral-300 text-base font-body leading-relaxed">
              Located conveniently at <strong className="text-white">3110 S. Jackson Rd. in Hidalgo, Texas</strong>, <strong>El Maracaná Sports Bar & Grill</strong> was created to bring together two great Rio Grande Valley traditions: authentic, mouth-watering food and the electric thrill of live sports and music.
            </p>

            <p className="text-neutral-400 text-sm font-body leading-relaxed">
              Whether you're dropping by on a Tuesday for <strong>$0.99 street tacos</strong>, bringing the family for weekday lunch burgers, gathering with your crew for <strong>Sunday NFL RedZone</strong>, or dancing the night away to live <strong>Banda and Norteño on Friday</strong>, El Maracaná delivers an experience you won’t find anywhere else in Hidalgo.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div key={i} className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                      <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-white font-display uppercase tracking-wide text-base">{h.title}</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-body">
                      {h.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 relative">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
                    alt="Bar Atmosphere"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80"
                    alt="Tacos Special"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
                    alt="Handcrafted Burger"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
                    alt="Live Band Friday"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating Stat Stamp */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-2xl bg-neutral-950/95 border border-amber-500/50 shadow-2xl backdrop-blur-xl text-center space-y-0.5">
                <span className="font-display text-3xl font-black text-amber-400 block">7 DAYS</span>
                <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest block">A WEEK</span>
                <span className="text-[10px] text-emerald-400 font-semibold block">Sports • Food • Music</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
