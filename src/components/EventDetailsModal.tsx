import React from 'react';
import { X, Calendar, Clock, Tv, Sparkles, MapPin, Phone, ChevronRight, Share2 } from 'lucide-react';
import { EventItem } from '../types';
import { VENUE_INFO } from '../data/venueData';

interface EventDetailsModalProps {
  event: EventItem | null;
  onClose: () => void;
  onReserveForEvent: (event: EventItem) => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  onClose,
  onReserveForEvent
}) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-neutral-900 border border-neutral-700 overflow-hidden shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          id="event-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-950/80 text-white hover:bg-neutral-800 border border-neutral-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Event Banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-neutral-800">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
          
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-neutral-950/90 text-amber-400 border border-amber-500/30">
              {event.leagueOrGenre}
            </span>
            {event.featuredBadge && (
              <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-emerald-500 text-neutral-950">
                {event.featuredBadge}
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight leading-none text-white drop-shadow">
              {event.title}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-emerald-400 mt-1">
              {event.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Key Event Details Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2 text-xs">
              <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase text-neutral-500 block font-bold">Date</span>
                <span className="font-bold text-white">{event.displayDate}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase text-neutral-500 block font-bold">Time</span>
                <span className="font-bold text-white">{event.time}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2 text-xs col-span-2 sm:col-span-1">
              <Tv className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase text-neutral-500 block font-bold">Broadcast</span>
                <span className="font-bold text-white truncate">Wall-to-Wall 4K</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400">
              Event Details & Atmosphere
            </h4>
            <p className="text-neutral-300 text-sm font-body leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Promo Callout */}
          {event.specialPromo && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 to-transparent border border-amber-500/30 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 block">
                  Game Day Special Available
                </span>
                <p className="text-xs text-neutral-200 mt-0.5">{event.specialPromo}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              id="event-modal-reserve-btn"
              onClick={() => {
                onClose();
                onReserveForEvent(event);
              }}
              className="w-full sm:flex-1 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Reserve Table for this Game</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              id="event-modal-call-btn"
              href={`tel:${VENUE_INFO.phoneRaw}`}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call Bar</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
