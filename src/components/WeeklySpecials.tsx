import React, { useState } from 'react';
import { WEEKLY_SPECIALS } from '../data/venueData';
import { getVenueStatus } from '../utils/timeHelpers';
import { Flame, Clock, Beer, PartyPopper, Tv } from 'lucide-react';
import type { WeeklySpecial } from '../types';

// Emoji per weekday (keyed by JS getDay index: 0 = Sunday)
const DAY_EMOJI: Record<number, string> = {
  1: '🍔',
  2: '🌮',
  3: '🍗',
  4: '🍻',
  5: '🎸',
  6: '⚽',
  0: '🏈',
};

// Icon per weekday, used on the selected-day detail panel
const DAY_ICON: Record<number, React.ElementType> = {
  1: Flame,
  2: Flame,
  3: Flame,
  4: PartyPopper,
  5: PartyPopper,
  6: Tv,
  0: PartyPopper,
};

// Per-day accent, driven by each special's own highlightColor
const DAY_COLOR_STYLES: Record<
  WeeklySpecial['highlightColor'],
  { bg: string; border: string; iconBg: string; text: string; glow: string; chipText: string }
> = {
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', iconBg: 'bg-amber-400', text: 'text-amber-700', glow: 'bg-amber-400/10', chipText: 'text-amber-700' },
  green: { bg: 'bg-emerald-50', border: 'border-emerald-200', iconBg: 'bg-emerald-400', text: 'text-emerald-700', glow: 'bg-emerald-400/10', chipText: 'text-emerald-700' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-400', text: 'text-blue-700', glow: 'bg-blue-400/10', chipText: 'text-blue-700' },
  red: { bg: 'bg-red-50', border: 'border-red-200', iconBg: 'bg-red-400', text: 'text-red-700', glow: 'bg-red-400/10', chipText: 'text-red-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', iconBg: 'bg-purple-400', text: 'text-purple-700', glow: 'bg-purple-400/10', chipText: 'text-purple-700' },
};

export const WeeklySpecials: React.FC = () => {
  const status = getVenueStatus();
  const [selectedDayIndex, setSelectedDayIndex] = useState(status.currentDayIndex);

  // Days order: Monday (1) through Sunday (0)
  const orderedDays = [
    WEEKLY_SPECIALS.find(s => s.dayIndex === 1)!, // Mon
    WEEKLY_SPECIALS.find(s => s.dayIndex === 2)!, // Tue
    WEEKLY_SPECIALS.find(s => s.dayIndex === 3)!, // Wed
    WEEKLY_SPECIALS.find(s => s.dayIndex === 4)!, // Thu
    WEEKLY_SPECIALS.find(s => s.dayIndex === 5)!, // Fri
    WEEKLY_SPECIALS.find(s => s.dayIndex === 6)!, // Sat
    WEEKLY_SPECIALS.find(s => s.dayIndex === 0)!, // Sun
  ];

  const selectedSpecial = WEEKLY_SPECIALS.find(s => s.dayIndex === selectedDayIndex)!;
  const selectedColors = DAY_COLOR_STYLES[selectedSpecial.highlightColor];
  const SelectedIcon = DAY_ICON[selectedSpecial.dayIndex];

  return (
    <section id="specials" className="relative py-20 sm:py-24 bg-stone-100 border-t border-stone-200 overflow-hidden">
      {/* Soft brand-colored glow behind the header */}
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-225 h-105 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600 text-white shadow-sm text-xs font-bold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" />
            <span>Daily Kitchen Specials & Entertainment</span>
          </div>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-black uppercase text-stone-900 tracking-tight leading-[0.95]">
            Weekly Specials at <span className="text-red-600">El Maracaná</span>
          </h2>
          <div aria-hidden className="flex items-center justify-center gap-2">
            <span className="h-1 w-10 rounded-full bg-stone-900" />
            <span className="h-1 w-4 rounded-full bg-red-600" />
            <span className="h-1 w-2 rounded-full bg-amber-500" />
          </div>
          <p className="text-stone-600 text-base sm:text-lg font-body max-w-2xl mx-auto">
            Every day of the week brings freshly prepared food discounts, drink deals, and live sports or music in Hidalgo.
          </p>
        </div>

        {/* Happy Hour Callout Banner */}
        <div className="relative overflow-hidden mb-8 rounded-3xl bg-white border border-stone-200 shadow-lg shadow-stone-900/5">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30 -rotate-3">
                <Beer className="w-8 h-8" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-700">
                    <Clock className="w-3.5 h-3.5" />
                    Mon – Fri | 3:00 PM – 7:00 PM
                  </span>
                  {status.isHappyHour && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                      Live Now
                    </span>
                  )}
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight mt-1 leading-none text-stone-900">
                  Weekday{' '}
                  <span className="font-marker normal-case text-amber-500 text-4xl sm:text-5xl inline-block -rotate-2 align-middle drop-shadow-[2px_2px_0_rgba(0,0,0,0.18)]">
                    Happy Hour
                  </span>{' '}
                  Specials
                </h3>
                <p className="text-sm text-stone-600 mt-1.5">
                  Cold 16 oz draft beers and signature house margaritas before the game.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 shrink-0">
              <div className="px-5 py-3.5 rounded-2xl bg-amber-50 border border-amber-100 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">16 oz Draft Beer</span>
                <span className="font-display text-4xl sm:text-5xl font-black text-amber-700 leading-none">$2.99</span>
              </div>
              <div className="px-5 py-3.5 rounded-2xl bg-amber-50 border border-amber-100 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">House Margaritas</span>
                <span className="font-display text-4xl sm:text-5xl font-black text-amber-700 leading-none">$4.99</span>
              </div>
            </div>
          </div>

          {/* Happy Hour photos: little polaroid-style prints, centered under the banner */}
          <div className="relative flex flex-wrap justify-center gap-5 sm:gap-6 px-6 sm:px-8 pb-6 sm:pb-8">
            {[
              { src: '/happyhour/web/happyhour-01.jpg', alt: 'Ice-cold beer bucket with Corona, Pacifico and Michelob Ultra, served with a cold draft beer', tilt: '-rotate-3', size: 'w-32 sm:w-40' },
              { src: '/happyhour/web/happyhour-03.jpg', alt: 'Happy Hour 3-7PM beer bucket with Pacifico, Corona and Michelob Ultra', tilt: 'rotate-0', size: 'w-40 sm:w-48 z-10' },
              { src: '/happyhour/web/happyhour-02.jpg', alt: 'Bloody Maria cocktail with celery, olives and lime, flanked by Pacifico and Corona bottles', tilt: 'rotate-3', size: 'w-32 sm:w-40' },
            ].map((photo, i) => (
              <div
                key={i}
                className={`${photo.size} bg-white p-2 pb-3 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-lg ${photo.tilt}`}
              >
                <div className="aspect-3/4 rounded-lg overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Specials Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {orderedDays.map((special) => {
            const isToday = special.dayIndex === status.currentDayIndex;
            const isSelected = special.dayIndex === selectedDayIndex;
            const colors = DAY_COLOR_STYLES[special.highlightColor];

            return (
              <button
                key={special.day}
                type="button"
                id={`day-card-${special.day.toLowerCase()}`}
                onClick={() => setSelectedDayIndex(special.dayIndex)}
                aria-pressed={isSelected}
                className={`text-left p-4 rounded-2xl border flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 border-stone-900 text-white shadow-lg shadow-stone-900/25'
                    : `${colors.bg} ${colors.border} text-stone-800 shadow-sm`
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-base leading-none shrink-0 ${
                      isSelected ? 'bg-white/10' : colors.iconBg
                    }`}
                    aria-hidden
                  >
                    {DAY_EMOJI[special.dayIndex]}
                  </span>
                  {isToday && (
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-900 text-white'
                      }`}
                    >
                      Today
                    </span>
                  )}
                </div>
                <div className="font-display text-2xl font-black uppercase tracking-tight mt-3 leading-none">
                  {special.day}
                </div>
                <div className={`text-xs font-semibold mt-1.5 leading-snug ${isSelected ? 'text-amber-400' : colors.text}`}>
                  {special.badge}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Day Detail Panel */}
        <div className={`relative overflow-hidden rounded-3xl bg-white border ${selectedColors.border} shadow-lg shadow-stone-900/5`}>
          <div aria-hidden className={`pointer-events-none absolute -left-24 -bottom-24 w-80 h-80 rounded-full ${selectedColors.glow} blur-3xl`} />

          <div className="relative p-6 sm:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-start sm:items-center gap-5 mb-5">
                <div className={`w-16 h-16 rounded-2xl ${selectedColors.iconBg} text-white flex items-center justify-center shrink-0 shadow-lg rotate-3`}>
                  <SelectedIcon className="w-8 h-8" />
                </div>
                <div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest ${selectedColors.text}`}>
                    <Clock className="w-3.5 h-3.5" />
                    Every {selectedSpecial.day}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight mt-1 leading-none text-stone-900">
                    {selectedSpecial.title}
                  </h3>
                  <p className="text-sm text-stone-600 mt-1.5">{selectedSpecial.subtitle}</p>
                </div>
              </div>

              {/* Deal chips */}
              <div className="flex flex-wrap gap-2">
                {selectedSpecial.items.map(item => (
                  <div
                    key={item.name}
                    className={`flex items-baseline gap-1.5 px-3.5 py-2 rounded-xl ${selectedColors.bg} border ${selectedColors.border}`}
                  >
                    {item.price && (
                      <span className={`font-display text-base font-black shrink-0 ${selectedColors.chipText}`}>
                        {item.price}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-stone-700">{item.name}</span>
                  </div>
                ))}
              </div>

              {selectedSpecial.entertainment && (
                <p className="flex items-start gap-2 text-xs sm:text-sm text-stone-500 border-t border-stone-100 mt-5 pt-4">
                  <Tv className="w-4 h-4 shrink-0 mt-0.5 text-stone-400" />
                  <span>{selectedSpecial.entertainment}</span>
                </p>
              )}
            </div>

            {/* Day photo */}
            {selectedSpecial.bannerImage && (
              <div className="w-full lg:w-72 xl:w-80 shrink-0">
                <div className="relative w-full h-48 lg:h-full min-h-48 rounded-2xl overflow-hidden">
                  <img
                    src={selectedSpecial.bannerImage}
                    alt={selectedSpecial.title}
                    className={`absolute inset-0 w-full h-full ${
                      selectedSpecial.bannerImageFit === 'contain' ? 'object-contain' : 'object-cover'
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
