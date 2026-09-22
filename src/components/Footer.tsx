import React, { useState } from 'react';
import { VENUE_INFO } from '../data/venueData';
import { Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { MaracanaLogo } from './MaracanaLogo';
import { submitVipSignup } from '../lib/actions';

export const Footer: React.FC = () => {
  const [vipName, setVipName] = useState('');
  const [vipPhone, setVipPhone] = useState('');
  const [vipSuccess, setVipSuccess] = useState(false);
  const [vipSubmitting, setVipSubmitting] = useState(false);
  const [vipError, setVipError] = useState('');

  const handleVipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vipName || !vipPhone) return;
    setVipError('');
    setVipSubmitting(true);
    const result = await submitVipSignup({ name: vipName, phone: vipPhone });
    setVipSubmitting(false);
    if (!result.ok) {
      setVipError(result.error);
      return;
    }
    setVipSuccess(true);
    setVipName('');
    setVipPhone('');
    setTimeout(() => setVipSuccess(false), 5000);
  };

  return (
    <footer className="bg-stone-900 border-t border-stone-800 text-stone-400 text-sm">
      {/* VIP Club banner */}
      <div className="border-b border-stone-800 bg-stone-950/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block">
                El Maracaná VIP Text Club
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
                Game Day Alerts & Exclusive Kitchen Specials
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 font-body">
                Get updates on UFC fight cards, soccer matchups, live weekend music, and table availability in Hidalgo.
              </p>
            </div>

            <div className="lg:col-span-6">
              {!vipSuccess ? (
                <form onSubmit={handleVipSubmit} className="flex flex-col gap-2 max-w-md lg:ml-auto">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Your name..."
                      value={vipName}
                      onChange={e => setVipName(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder:text-stone-500 text-xs sm:text-sm focus:outline-none focus:border-stone-500"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone number..."
                      value={vipPhone}
                      onChange={e => setVipPhone(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder:text-stone-500 text-xs sm:text-sm focus:outline-none focus:border-stone-500"
                    />
                  </div>
                  {vipError && <p className="text-xs text-red-400 font-semibold">{vipError}</p>}
                  <button
                    type="submit"
                    disabled={vipSubmitting}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>{vipSubmitting ? 'Joining...' : 'Join Club'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10px] text-stone-500 leading-relaxed">
                    By joining you agree to receive recurring automated marketing texts from El
                    Maracaná. Msg &amp; data rates may apply. Reply STOP to cancel.
                  </p>
                </form>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs sm:text-sm flex items-center gap-2 max-w-md lg:ml-auto">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>You're in! Watch for upcoming specials and match alerts.</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MaracanaLogo className="w-12 h-12" />
              <div>
                <span className="font-display text-xl font-black uppercase text-white tracking-wider">
                  El Maracaná
                </span>
                <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest -mt-0.5">
                  Sports Bar & Grill
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-400 font-body leading-relaxed">
              Hidalgo's premier sports lounge, scratch kitchen, and live entertainment venue. Watch NFL, Liga MX, and UFC with ice-cold drafts and great food.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="space-y-2.5">
            <h4 className="font-display text-base font-bold uppercase text-white tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#specials" className="hover:text-amber-400 transition-colors">Daily Specials</a></li>
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">Food & Drink Menu</a></li>
              <li><a href="#sports" className="hover:text-amber-400 transition-colors">Sports We Broadcast</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Photo Gallery</a></li>
              <li><a href="#location" className="hover:text-amber-400 transition-colors">Hours & Directions</a></li>
            </ul>
          </div>

          {/* Daily Specials Quick Peek */}
          <div className="space-y-2.5">
            <h4 className="font-display text-base font-bold uppercase text-white tracking-wider">
              Daily Specials
            </h4>
            <ul className="space-y-1 text-xs">
              <li><strong className="text-white">Monday:</strong> $7.99 Burgers + MNF</li>
              <li><strong className="text-white">Tuesday:</strong> $0.99 Street Tacos</li>
              <li><strong className="text-white">Wednesday:</strong> $0.69 Wings</li>
              <li><strong className="text-white">Thursday:</strong> 50% Off Apps + DJ Karaoke</li>
              <li><strong className="text-white">Friday:</strong> Live Banda & Norteño</li>
              <li><strong className="text-white">Saturday:</strong> Liga MX Matchdays</li>
              <li><strong className="text-white">Sunday:</strong> NFL RedZone & Football</li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-2.5">
            <h4 className="font-display text-base font-bold uppercase text-white tracking-wider">
              Location & Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>3110 S. Jackson Rd.<br />Hidalgo, TX 78557</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                <a href={`tel:${VENUE_INFO.phoneRaw}`} className="text-white hover:text-amber-400 font-semibold transition-colors">
                  (956) 322-8814
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-stone-800">
                <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <div className="text-stone-400 space-y-0.5">
                  <p>Mon–Thu: 11:00 AM – 12:00 AM</p>
                  <p>Fri–Sat: 11:00 AM – 2:00 AM</p>
                  <p>Sunday: 11:00 AM – 12:00 AM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} El Maracaná Sports Bar & Grill. All rights reserved.</p>
          <p>Hidalgo, Texas • (956) 322-8814</p>
        </div>
      </div>
    </footer>
  );
};
