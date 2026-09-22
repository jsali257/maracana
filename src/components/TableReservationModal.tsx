import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, MapPin } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { EventItem } from '../types';
import { BookingPrefill } from './Hero';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledEvent?: EventItem | null;
  prefilledDetails?: BookingPrefill | null;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
  prefilledEvent,
  prefilledDetails
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: 'Today',
    time: '7:00 PM',
    guests: '4',
    seatingPreference: 'main-screen',
    eventName: '',
    specialRequests: ''
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        date: prefilledDetails?.date || (prefilledEvent ? prefilledEvent.displayDate : prev.date || 'Today'),
        time: prefilledDetails?.time || (prefilledEvent ? prefilledEvent.time : prev.time || '7:00 PM'),
        guests: prefilledDetails?.guests || prev.guests || '4',
        seatingPreference: prefilledDetails?.seatingPreference || prev.seatingPreference || 'main-screen',
        eventName: prefilledDetails?.eventName || (prefilledEvent ? prefilledEvent.title : prev.eventName || ''),
      }));
    }
  }, [isOpen, prefilledEvent, prefilledDetails]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `EM-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationCode(code);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 shadow-2xl my-8">
        
        {/* Close button */}
        <button
          id="reservation-close-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
          aria-label="Close Reservation Form"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="space-y-5">
            {/* Header */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                Table & Game Day Reservation
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-stone-900">
                Reserve Your Table
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-body mt-1">
                Book your table at <strong>El Maracaná Sports Bar & Grill</strong> for live sports viewing, family dining, or group events.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Carlos Rodriguez"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(956) 000-0000"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Today / Saturday"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Time *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 7:00 PM"
                    value={formData.time}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Party Size *</label>
                  <select
                    value={formData.guests}
                    onChange={e => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-500"
                  >
                    <option value="2">2 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="8">8 Guests</option>
                    <option value="10">10+ Guests</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Seating Area</label>
                <select
                  value={formData.seatingPreference}
                  onChange={e => setFormData({ ...formData, seatingPreference: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-500"
                >
                  <option value="main-screen">View of Big Screen</option>
                  <option value="bar-stools">High-Top Table Near Bar</option>
                  <option value="booth">Dining Booth</option>
                  <option value="stage-view">Near Live Entertainment</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Special requests or game you are watching..."
                  value={formData.specialRequests}
                  onChange={e => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
                />
              </div>

              <div className="pt-2">
                <button
                  id="confirm-reservation-submit-btn"
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-sm bg-stone-900 hover:bg-stone-800 text-white transition-colors cursor-pointer shadow-xs"
                >
                  Confirm Table Request
                </button>
              </div>

              <p className="text-[11px] text-center text-stone-500">
                Questions or immediate bookings? Call us at{' '}
                <a href={`tel:${VENUE_INFO.phoneRaw}`} className="text-amber-800 font-semibold underline">
                  (956) 322-8814
                </a>.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                Reservation Confirmed
              </span>
              <h3 className="font-display text-2xl font-black uppercase text-stone-900">
                Your Table is Requested!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Thank you, <strong>{formData.name}</strong>. We look forward to welcoming you to El Maracaná.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-700 text-left">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Confirmation Code:</span>
                <span className="font-mono font-bold text-stone-900">{reservationCode}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Party Size:</span>
                <span className="font-semibold text-stone-900">{formData.guests} Guests</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Date & Time:</span>
                <span className="font-semibold text-stone-900">{formData.date} at {formData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Location:</span>
                <span className="font-semibold text-stone-900">3110 S. Jackson Rd., Hidalgo, TX</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href={VENUE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-stone-600" />
                <span>Directions</span>
              </a>
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
