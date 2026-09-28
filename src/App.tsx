'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SportsLogosBar } from './components/SportsLogosBar';
import { WeeklySpecials } from './components/WeeklySpecials';
import { MenuSection } from './components/MenuSection';
import { PhotoGallery } from './components/PhotoGallery';
import { HoursAndLocation } from './components/HoursAndLocation';
import { TableReservationModal } from './components/TableReservationModal';
import { VipClubPopup } from './components/VipClubPopup';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { MobileQuickActions } from './components/MobileQuickActions';
import { EventItem } from './types';
import { BookingPrefill } from './components/Hero';
import { callToReserve } from './utils/reservation';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [prefilledEvent, setPrefilledEvent] = useState<EventItem | null>(null);
  const [prefilledBookingDetails, setPrefilledBookingDetails] = useState<BookingPrefill | null>(null);

  // The online reservation form is on hold for now — every "Reserve" CTA site-wide
  // dials the venue directly instead. The form/modal below is kept wired up and
  // untouched so it can be switched back on later (just restore the body below).
  const handleOpenReservation = (_eventOrDetails?: EventItem | BookingPrefill | null) => {
    callToReserve();
  };

  const handleCloseReservation = () => {
    setIsReservationOpen(false);
    setPrefilledEvent(null);
    setPrefilledBookingDetails(null);
  };

  const [isVipOpen, setIsVipOpen] = useState(false);

  useEffect(() => {
    // A direct link (e.g. shared on social media) always opens the popup
    // immediately, bypassing the delay and any past dismissal.
    if (new URLSearchParams(window.location.search).get('vip') === '1') {
      setIsVipOpen(true);
      return;
    }

    try {
      if (localStorage.getItem('vip-popup-joined')) return;
      const dismissedUntil = Number(localStorage.getItem('vip-popup-dismissed-until') || 0);
      if (dismissedUntil && Date.now() < dismissedUntil) return;
    } catch {
      // localStorage unavailable — fall through and show the popup anyway
    }
    const timer = setTimeout(() => setIsVipOpen(true), 8000);
    return () => clearTimeout(timer);
  }, []);

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

      {/* VIP Text Club Popup */}
      <VipClubPopup isOpen={isVipOpen} onClose={() => setIsVipOpen(false)} />

      {/* Back to Top */}
      <BackToTop />

      {/* Mobile Bottom Quick Action Bar */}
      <MobileQuickActions />

    </div>
  );
}
