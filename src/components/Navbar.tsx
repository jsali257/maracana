import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Calendar, Utensils, Flame, Menu as MenuIcon, X, Tv, Image } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { getVenueStatus } from '../utils/timeHelpers';
import { MaracanaLogo } from './MaracanaLogo';

interface NavbarProps {
  onOpenReservation: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [venueStatus, setVenueStatus] = useState(getVenueStatus());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setVenueStatus(getVenueStatus());
    }, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: "Specials", href: "#specials", icon: Flame, badge: "Daily Deals" },
    { name: "Food & Drinks", href: "#menu", icon: Utensils },
    { name: "Live Sports", href: "#sports", icon: Tv },
    { name: "Gallery", href: "#gallery", icon: Image },
    { name: "Hours & Location", href: "#location", icon: MapPin },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top announcement bar */}
      <div className="bg-stone-900 border-b border-stone-800 text-xs px-4 py-1.5 text-stone-300 flex items-center justify-between">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar whitespace-nowrap text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5">
            <span className={`inline-block w-2 h-2 rounded-full ${venueStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            <span className="font-semibold text-white">{venueStatus.statusText}</span>
          </div>
          <span className="text-stone-600 hidden md:inline">•</span>
          <div className="hidden md:flex items-center gap-1 text-stone-300">
            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
            <span>3110 S. Jackson Rd., Hidalgo, TX</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            id="topbar-call-link"
            href={`tel:${VENUE_INFO.phoneRaw}`}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
          >
            <Phone className="w-3 h-3" />
            <span>(956) 322-8814</span>
          </a>
          <a
            id="topbar-directions-link"
            href={VENUE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-stone-300 hover:text-white transition-colors"
          >
            <span>Directions</span>
          </a>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav className={`transition-all duration-300 ${scrolled ? 'bg-stone-950/95 shadow-lg border-b border-stone-800 backdrop-blur-md py-3' : 'bg-gradient-to-b from-stone-950/95 via-stone-950/80 to-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <MaracanaLogo className="w-10 h-10 transition-transform group-hover:scale-105" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl font-black tracking-wider text-white uppercase">
                  El Maracaná
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                  Hidalgo, TX
                </span>
              </div>
              <p className="text-[10px] uppercase font-semibold tracking-widest text-stone-400 -mt-0.5">
                Sports Bar & Grill
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-stone-300 hover:text-white hover:bg-stone-800/80 transition-all flex items-center gap-1.5"
              >
                {link.name}
                {link.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-stone-800 text-amber-400 border border-stone-700">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              id="nav-reserve-table-btn"
              onClick={onOpenReservation}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              Reserve Table
            </button>
            <a
              id="nav-call-btn"
              href={`tel:${VENUE_INFO.phoneRaw}`}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>(956) 322-8814</span>
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="nav-mobile-reserve-btn"
              onClick={onOpenReservation}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-stone-950"
            >
              Reserve
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-stone-950/98 border-b border-stone-800 px-5 py-6 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-stone-200 hover:text-amber-400 hover:bg-stone-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {link.icon && <link.icon className="w-4 h-4 text-amber-400" />}
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-800 text-amber-400 border border-stone-700">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
            
            <div className="pt-4 border-t border-stone-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3 rounded-xl text-center font-bold text-sm bg-amber-500 text-stone-950"
              >
                Reserve a Table
              </button>
              <a
                href={`tel:${VENUE_INFO.phoneRaw}`}
                className="w-full py-2.5 rounded-xl text-center font-semibold text-sm bg-stone-900 text-white border border-stone-800 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call (956) 322-8814</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
