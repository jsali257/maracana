import React, { useRef, useState } from 'react';
import { Utensils, Phone, Calendar, Pause, Play, ShoppingBag, MapPin, Flame, Star } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { getVenueStatus } from '../utils/timeHelpers';
import { MaracanaLogo } from './MaracanaLogo';

export interface BookingPrefill {
  date?: string;
  time?: string;
  guests?: string;
  seatingPreference?: string;
  eventName?: string;
}

interface HeroProps {
  onOpenReservation: (prefill?: BookingPrefill) => void;
}

const HERO_VIDEO = '/video/MaracanaHeroVideo.mp4';
const HERO_POSTER = '/video/hero-poster.jpg';

// Visitors with data-saver turned on don't auto-download the video; they can press play
const isDataSaverOn = () =>
  typeof navigator !== 'undefined' &&
  !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  const status = getVenueStatus();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dataSaver] = useState(isDataSaverOn);
  const [isPlaying, setIsPlaying] = useState(!dataSaver);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => setIsPlaying(false));
    else video.pause();
  };

  return (
    <section 
      id="hero"
      className="relative min-h-[75vh] lg:min-h-[82vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-stone-950 text-white"
    >
      {/* Background video (muted loop) with subtle cinematic overlay */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay={!dataSaver}
          muted
          loop
          playsInline
          preload={dataSaver ? 'none' : 'auto'}
          aria-hidden="true"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover object-center opacity-50 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/80" />
      </div>

      {/* Main Content Container - Centered, Grand & Simple */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Venue status badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {/* Veteran owned badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[11px] font-semibold uppercase tracking-widest text-stone-200">
            <Star className="w-3 h-3 text-amber-400 shrink-0 fill-amber-400" />
            <span>Veteran Owned</span>
          </div>

          {/* Location chip */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[11px] font-semibold uppercase tracking-widest text-stone-300">
            <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
            <span>3110 S. Jackson Rd., Hidalgo, TX</span>
          </div>

          {/* Live status chip */}
          {status.isHappyHour ? (
            <div className="inline-flex flex-wrap items-center justify-center gap-2 max-w-full pl-2.5 pr-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-red-500 shadow-lg shadow-amber-500/25 text-white text-xs sm:text-sm font-bold">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <Flame className="w-3.5 h-3.5 shrink-0" />
              <span className="sm:hidden">Happy Hour Live Now</span>
              <span className="hidden sm:inline">
                Happy Hour Live Now: $2.99 Drafts &amp; $4.99 Margaritas
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs sm:text-sm font-semibold text-stone-100">
              <span className="relative flex h-2 w-2 shrink-0">
                {status.isOpen && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    status.isOpen ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
              </span>
              <span>{status.statusText}</span>
            </div>
          )}
        </div>

        {/* Venue Official Logo */}
        <div className="flex justify-center pb-1">
          <MaracanaLogo className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-2xl" />
        </div>

        {/* Display Headline */}
        <div className="space-y-2">
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95]">
            El Maracaná <br />
            <span className="text-amber-400">Sports Bar & Grill</span>
          </h1>
        </div>

        {/* Sub-description */}
        <p className="text-stone-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto font-body leading-relaxed">
          Eat, drink, watch every major game, and enjoy live weekend entertainment right here in Hidalgo, Texas.
        </p>

        {/* Simple, Clean Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <button
            id="hero-book-vip-btn"
            onClick={() => onOpenReservation()}
            className="px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve a Table</span>
          </button>

          <a
            id="hero-order-online-btn"
            href={VENUE_INFO.doordashUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-red-600 hover:bg-red-500 text-white transition-colors shadow-md flex items-center gap-2 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Online</span>
          </a>

          <a
            id="hero-view-menu-btn"
            href="#menu"
            className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-stone-900 hover:bg-stone-800 text-white border border-stone-700 transition-colors flex items-center gap-2"
          >
            <Utensils className="w-4 h-4 text-stone-400" />
            <span>View Menu</span>
          </a>

          <a
            id="hero-call-venue-btn"
            href={`tel:${VENUE_INFO.phoneRaw}`}
            className="px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-stone-900/80 hover:bg-stone-900 text-stone-300 hover:text-white border border-stone-800 transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>(956) 322-8814</span>
          </a>
        </div>

      </div>

      {/* Pause / play the background video */}
      <button
        id="hero-video-toggle"
        type="button"
        onClick={toggleVideo}
        aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
        className="absolute bottom-4 left-4 z-20 w-9 h-9 rounded-full bg-stone-900/70 hover:bg-stone-800 border border-stone-700 text-white flex items-center justify-center backdrop-blur-sm cursor-pointer transition-colors"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>

    </section>
  );
};
