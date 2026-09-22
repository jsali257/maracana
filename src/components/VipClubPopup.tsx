import React, { useState } from 'react';
import { X, CheckCircle2, MessageCircleHeart } from 'lucide-react';
import { submitVipSignup } from '../lib/actions';

interface VipClubPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const DISMISS_KEY = 'vip-popup-dismissed-until';
const JOINED_KEY = 'vip-popup-joined';
const DISMISS_DAYS = 30;

export const VipClubPopup: React.FC<VipClubPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const dismiss = () => {
    try {
      const until = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
      localStorage.setItem(DISMISS_KEY, String(until));
    } catch {
      // localStorage unavailable (private browsing, etc.) — fine to skip
    }
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const result = await submitVipSignup(formData);
    setIsSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    try {
      localStorage.setItem(JOINED_KEY, 'true');
    } catch {
      // ignore
    }
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 shadow-2xl my-8">
        <button
          id="vip-popup-close-btn"
          onClick={dismiss}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          aria-label="Close VIP Club Signup"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-amber-700">
              <MessageCircleHeart className="w-5 h-5" />
              <span className="text-[11px] font-bold uppercase tracking-wider">VIP Text Club</span>
            </div>

            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-stone-900 leading-tight">
                Get Daily Specials by Text
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-body mt-2">
                Join the El Maracaná VIP Text Club for happy hour alerts, daily specials, and live
                entertainment updates straight to your phone.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
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
                <label className="block text-stone-700 font-semibold mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="(956) 000-0000"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
                />
              </div>

              <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-amber-500 shrink-0" />
                <span className="text-[11px] leading-relaxed text-stone-500">
                  By checking this box, I agree to receive recurring automated marketing text
                  messages (e.g. daily specials, events) from El Maracaná Sports Bar & Grill at the
                  phone number provided. Consent is not a condition of purchase. Msg &amp; data rates
                  may apply. Reply STOP to cancel, HELP for help.
                </span>
              </label>

              {error && <p className="text-xs text-center text-red-600 font-semibold">{error}</p>}

              <div className="pt-1">
                <button
                  id="vip-popup-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors cursor-pointer shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Joining...' : 'Join the VIP Text Club'}
                </button>
              </div>

              <button
                type="button"
                onClick={dismiss}
                className="w-full text-center text-[11px] text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
              >
                No thanks, maybe later
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                You're In!
              </span>
              <h3 className="font-display text-2xl font-black uppercase text-stone-900">
                Welcome to the VIP Club
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Keep an eye on your phone for daily specials and happy hour alerts from El Maracaná.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
