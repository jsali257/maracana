import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Car, CheckCircle2, Beer } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { getVenueStatus } from '../utils/timeHelpers';

interface HoursAndLocationProps {
  onOpenReservation: () => void;
}

export const HoursAndLocation: React.FC<HoursAndLocationProps> = ({ onOpenReservation }) => {
  const status = getVenueStatus();

  return (
    <section id="location" className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-amber-800 text-xs font-bold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            <span>Visit Us in Hidalgo</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase text-stone-900 tracking-tight leading-none">
            Hours & <span className="text-amber-700">Location</span>
          </h2>
          <p className="text-stone-700 text-base font-body">
            Conveniently located on South Jackson Road in Hidalgo, Texas with spacious parking and prime game day seating.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Hours, Address & Contacts */}
          <div className="lg:col-span-6 space-y-6">

            {/* Address & Quick Phone Card */}
            <div className="relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-lg shadow-stone-900/5 space-y-5">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30 -rotate-3">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Sports Bar & Grill</span>
                    <h3 className="font-display text-3xl font-black uppercase text-stone-900 leading-none">
                      {VENUE_INFO.name}
                    </h3>
                    <p className="text-sm text-stone-600 font-medium pt-1">
                      {VENUE_INFO.fullAddress}
                    </p>
                  </div>
                </div>

                {/* Status Indicator */}
                <span
                  className={`hidden sm:inline-flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                    status.isOpen
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-stone-100 text-stone-600 border-stone-200'
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    {status.isOpen && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    )}
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${status.isOpen ? 'bg-emerald-500' : 'bg-stone-400'}`} />
                  </span>
                  <span>{status.isOpen ? 'Open Now' : 'Closed'}</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  id="location-get-directions-btn"
                  href={VENUE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-stone-900 hover:bg-stone-800 text-white transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
                <a
                  id="location-call-btn"
                  href={`tel:${VENUE_INFO.phoneRaw}`}
                  className="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-stone-600" />
                  <span>Call (956) 322-8814</span>
                </a>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-lg shadow-stone-900/5 space-y-4">
              <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-stone-900 font-display text-xl font-bold uppercase">Hours of Operation</span>
                </div>
                <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wide shrink-0">Hidalgo, TX (CST)</span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                {VENUE_INFO.hours.map((schedule, idx) => {
                  const isMonThu = schedule.days.includes("Monday");
                  const isFriSat = schedule.days.includes("Friday");
                  const isSun = schedule.days.includes("Sunday");
                  const currentDay = status.currentDayIndex;

                  const isTodayRow =
                    (isMonThu && currentDay >= 1 && currentDay <= 4) ||
                    (isFriSat && (currentDay === 5 || currentDay === 6)) ||
                    (isSun && currentDay === 0);

                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                        isTodayRow
                          ? 'bg-amber-50 border border-amber-200 text-stone-900 font-bold'
                          : 'bg-stone-50 border border-stone-100 text-stone-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isTodayRow ? (
                          <span className="relative flex h-1.5 w-1.5 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
                          </span>
                        ) : (
                          <span className="w-1.5 h-1.5 shrink-0" />
                        )}
                        <span>{schedule.days}</span>
                      </div>
                      <span className="font-mono text-stone-900 font-semibold">{schedule.time}</span>
                    </div>
                  );
                })}
              </div>

              {/* Happy Hour reminder inside hours box */}
              <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 flex flex-wrap items-center justify-between gap-2 text-xs shadow-md shadow-amber-500/20">
                <div className="flex items-center gap-2 text-stone-950 font-bold">
                  <Beer className="w-4 h-4 shrink-0" />
                  <span>Happy Hour: Mon–Fri | 3:00 PM – 7:00 PM</span>
                </div>
                <span className="text-stone-950 font-black">$2.99 Drafts</span>
              </div>
            </div>

            {/* Venue Amenities */}
            <div className="grid grid-cols-2 gap-3 text-xs text-stone-700">
              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Car className="w-4.5 h-4.5" />
                </div>
                <span className="font-semibold text-stone-800">Spacious Free Parking</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                </div>
                <span className="font-semibold text-stone-800">Full Bar & Dining Seating</span>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps & Location Directions */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-lg shadow-stone-900/5">
              <div className="p-4 bg-white border-b border-stone-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center shrink-0">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-800">3110 S. Jackson Rd., Hidalgo, TX</span>
                </div>
                <a
                  href={VENUE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Natural Google Maps embed iframe */}
              <div className="aspect-[4/3] sm:aspect-[16/11] w-full relative bg-stone-100">
                <iframe
                  title="El Maracaná Sports Bar & Grill Location Map"
                  src="https://maps.google.com/maps?q=3110+S+Jackson+Rd,+Hidalgo,+TX+78557&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Map Footer Note */}
              <div className="p-4 bg-white border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                <span>Near McAllen / Pharr / Hidalgo International Bridge area</span>
                <button
                  id="map-reserve-btn"
                  onClick={onOpenReservation}
                  className="text-stone-900 hover:text-amber-700 font-bold cursor-pointer transition-colors"
                >
                  Book a Table &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
