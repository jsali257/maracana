'use client';

import React from 'react';
import { Navbar } from './Navbar';
import { MenuSection } from './MenuSection';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { MobileQuickActions } from './MobileQuickActions';
import { callToReserve } from '../utils/reservation';

export default function MenuPageContent() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-500 selection:text-stone-950 flex flex-col pb-16 sm:pb-0">
      <Navbar onOpenReservation={callToReserve} activeSection="menu" />

      <main className="flex-grow pt-28">
        <MenuSection onOpenReservation={callToReserve} />
      </main>

      <Footer />
      <BackToTop />
      <MobileQuickActions />
    </div>
  );
}
