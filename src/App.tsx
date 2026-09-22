import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SportsLogosBar } from './components/SportsLogosBar';
import { WeeklySpecials } from './components/WeeklySpecials';
import { MenuSection } from './components/MenuSection';
import { PhotoGallery } from './components/PhotoGallery';
import { HoursAndLocation } from './components/HoursAndLocation';
import { TableReservationModal } from './components/TableReservationModal';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { EventItem } from './types';
import { BookingPrefill } from './components/Hero';
import { Phone, Calendar, MapPin } from 'lucide-react';
import { VENUE_INFO } from './data/venueData';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [prefilledEvent, setPrefilledEvent] = useState<EventItem | null>(null);
  const [prefilledBookingDetails, setPrefilledBookingDetails] = useState<BookingPrefill | null>(null);

  const handleOpenReservation = (eventOrDetails?: EventItem | BookingPrefill | null) => {
    if (eventOrDetails && 'category' in eventOrDetails) {
      setPrefilledEvent(eventOrDetails as EventItem);
      setPrefilledBookingDetails(null);
    } else if (eventOrDetails) {
      setPrefilledBookingDetails(eventOrDetails as BookingPrefill);
      setPrefilledEvent(null);
    } else {
      setPrefilledEvent(null);
      setPrefilledBookingDetails(null);
    }
    setIsReservationOpen(true);
  };

  const handleCloseReservation = () => {
    setIsReservationOpen(false);
    setPrefilledEvent(null);
    setPrefilledBookingDetails(null);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-500 selection:text-stone-950 flex flex-col pb-16 sm:pb-0">
      
      {/* Top Navbar */}
      <Navbar
        onOpenReservation={() => handleOpenReservation()}
        activeSection="home"
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero onOpenReservation={() => handleOpenReservation()} />

        {/* 2. Official Sports Broadcast Logos (NFL, Liga MX, UFC, etc.) */}
        <SportsLogosBar />

        {/* 3. Weekly Specials & Happy Hour */}
        <WeeklySpecials />

        {/* 4. Food & Drinks Menu */}
        <MenuSection onOpenReservation={() => handleOpenReservation()} />

        {/* 5. Photo Gallery */}
        <PhotoGallery />

        {/* 6. Hours, Location & Natural Google Map */}
        <HoursAndLocation onOpenReservation={() => handleOpenReservation()} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Reservation Modal */}
      <TableReservationModal
        isOpen={isReservationOpen}
        onClose={handleCloseReservation}
        prefilledEvent={prefilledEvent}
        prefilledDetails={prefilledBookingDetails}
      />

      {/* Back to Top */}
      <BackToTop />

      {/* Mobile Bottom Quick Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-stone-900/95 border-t border-stone-800 backdrop-blur-md px-3 py-2 flex items-center justify-between gap-2 shadow-lg">
        <a
          id="mobile-bottom-call-btn"
          href={`tel:${VENUE_INFO.phoneRaw}`}
          className="flex-1 py-2 rounded-xl text-xs font-bold bg-stone-800 text-white border border-stone-700 flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
          <span>Call</span>
        </a>
        <a
          id="mobile-bottom-directions-btn"
          href={VENUE_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 rounded-xl text-xs font-bold bg-stone-800 text-white border border-stone-700 flex items-center justify-center gap-1.5"
        >
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Directions</span>
        </a>
        <button
          id="mobile-bottom-reserve-btn"
          onClick={() => handleOpenReservation()}
          className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-500 text-stone-950 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Reserve</span>
        </button>
      </div>

    </div>
  );
}
