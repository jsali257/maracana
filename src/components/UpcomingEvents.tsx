import React, { useState, useEffect } from 'react';
import { EventItem, EventCategory } from '../types';
import { INITIAL_EVENTS } from '../data/venueData';
import { Calendar, Clock, Tv, Music, Trophy, Flame, Plus, ChevronRight, Check, X, Shield, Sparkles } from 'lucide-react';

interface UpcomingEventsProps {
  onSelectEventForBooking: (event: EventItem) => void;
  onOpenEventDetails: (event: EventItem) => void;
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
  onSelectEventForBooking,
  onOpenEventDetails
}) => {
  const [events, setEvents] = useState<EventItem[]>(() => {
    try {
      const saved = localStorage.getItem('el_maracana_events');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_EVENTS;
  });

  const [activeCategory, setActiveCategory] = useState<EventCategory>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [calendarToast, setCalendarToast] = useState<string | null>(null);

  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: '',
    subtitle: '',
    category: 'soccer' as EventCategory,
    date: '',
    time: '',
    leagueOrGenre: '',
    description: '',
    specialPromo: '',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80'
  });

  useEffect(() => {
    try {
      localStorage.setItem('el_maracana_events', JSON.stringify(events));
    } catch {
      // ignore
    }
  }, [events]);

  const filteredEvents = activeCategory === 'all'
    ? events
    : events.filter(e => e.category === activeCategory);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;

    const item: EventItem = {
      id: `custom-event-${Date.now()}`,
      title: newEvent.title,
      subtitle: newEvent.subtitle || 'Live at El Maracaná',
      category: newEvent.category,
      date: newEvent.date || 'Upcoming This Week',
      displayDate: newEvent.date || 'This Week',
      time: newEvent.time || 'Check with venue',
      leagueOrGenre: newEvent.leagueOrGenre || 'Live Event',
      description: newEvent.description || 'Join us at El Maracaná for great food, drinks, and prime viewing.',
      image: newEvent.image,
      specialPromo: newEvent.specialPromo || 'Game Day Drink & Food Specials',
      tvScreenCoverage: 'Shown on Main HD Screens & Stadium Sound'
    };

    setEvents(prev => [item, ...prev]);
    setShowAddModal(false);
    setNewEvent({
      title: '',
      subtitle: '',
      category: 'soccer',
      date: '',
      time: '',
      leagueOrGenre: '',
      description: '',
      specialPromo: '',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80'
    });
  };

  const handleAddToCalendar = (event: EventItem) => {
    // Generate simple calendar reminder toast or google calendar link
    const title = encodeURIComponent(`${event.title} at El Maracaná Sports Bar`);
    const details = encodeURIComponent(`${event.description}\nSpecial: ${event.specialPromo || 'Specials available'}\nLocation: 3110 S. Jackson Rd., Hidalgo, TX`);
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=3110+S.+Jackson+Rd.,+Hidalgo,+TX`;
    
    window.open(gcalUrl, '_blank');
    setCalendarToast(`Added "${event.title}" to Google Calendar!`);
    setTimeout(() => setCalendarToast(null), 4000);
  };

  return (
    <section id="events" className="py-20 bg-neutral-950 relative overflow-hidden border-t border-neutral-900">
      {/* Background glow */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5" />
              <span>Live Sports & Nightlife Calendar</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-none">
              Upcoming Games & <span className="text-emerald-400">Events</span>
            </h2>
            <p className="text-neutral-400 text-base font-body">
              Never miss a kickoff, title bout, or live banda. Check our schedule below and lock in your table before big matches sell out!
            </p>
          </div>

          {/* Manager Quick Update Button */}
          <div className="shrink-0 flex items-center gap-3">
            <button
              id="events-add-custom-btn"
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-neutral-900 hover:bg-neutral-800 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add / Update Event</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: 'all', label: 'All Events', icon: Sparkles },
            { id: 'nfl', label: 'NFL & Football', icon: Trophy },
            { id: 'soccer', label: 'Liga MX & Soccer', icon: Flame },
            { id: 'live-music', label: 'Live Music & Banda', icon: Music },
            { id: 'karaoke', label: 'DJ Karaoke', icon: Music },
            { id: 'combat', label: 'UFC & Boxing', icon: Shield },
          ].map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`event-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id as EventCategory)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                  isActive
                    ? 'bg-neutral-100 text-neutral-950 border-white shadow-sm font-bold'
                    : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Calendar Toast Notification */}
        {calendarToast && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-sm flex items-center justify-between animate-fade-in shadow-xl">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{calendarToast}</span>
            </div>
            <button onClick={() => setCalendarToast(null)} className="text-emerald-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              className="rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700/80 transition-all group overflow-hidden flex flex-col shadow-xl hover:shadow-2xl"
            >
              {/* Event Image & Badges */}
              <div className="relative aspect-video w-full overflow-hidden border-b border-neutral-800">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                
                {/* League / Category Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-neutral-950/90 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                    {event.leagueOrGenre}
                  </span>
                  {event.featuredBadge && (
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-neutral-950 backdrop-blur-md">
                      {event.featuredBadge}
                    </span>
                  )}
                </div>

                {/* Date & Time Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-1.5 font-bold bg-neutral-950/80 px-2.5 py-1 rounded-lg border border-neutral-800">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{event.displayDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold text-neutral-300 bg-neutral-900/80 px-2.5 py-1 rounded-lg border border-neutral-800">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>

              {/* Event Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white leading-tight group-hover:text-amber-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-400">
                    {event.subtitle}
                  </p>
                  <p className="text-xs text-neutral-400 line-clamp-2 font-body">
                    {event.description}
                  </p>
                </div>

                {/* Specs: Screen coverage & Promo */}
                <div className="space-y-2 pt-2 border-t border-neutral-800/80 text-xs">
                  {event.tvScreenCoverage && (
                    <div className="flex items-center gap-2 text-neutral-300">
                      <Tv className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{event.tvScreenCoverage}</span>
                    </div>
                  )}
                  {event.specialPromo && (
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{event.specialPromo}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    id={`book-table-for-${event.id}`}
                    onClick={() => onSelectEventForBooking(event)}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
                  >
                    <span>Reserve Table</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    id={`remind-me-${event.id}`}
                    onClick={() => handleAddToCalendar(event)}
                    title="Add to Google Calendar"
                    className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
                    aria-label="Add to Calendar"
                  >
                    <Calendar className="w-4 h-4" />
                  </button>
                  <button
                    id={`details-${event.id}`}
                    onClick={() => onOpenEventDetails(event)}
                    className="px-3 py-2.5 rounded-xl text-xs font-semibold bg-neutral-950 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition-colors cursor-pointer"
                  >
                    Details
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add / Update Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-700 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2 text-white font-display text-xl font-black uppercase">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <span>Add / Update Upcoming Event</span>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. América vs Guadalajara or Friday Live Banda"
                  value={newEvent.title}
                  onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Category</label>
                  <select
                    value={newEvent.category}
                    onChange={e => setNewEvent({...newEvent, category: e.target.value as EventCategory})}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="soccer">Liga MX & Soccer</option>
                    <option value="nfl">NFL Football</option>
                    <option value="live-music">Live Music & Banda</option>
                    <option value="karaoke">DJ Karaoke</option>
                    <option value="combat">UFC & Boxing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">League / Genre</label>
                  <input
                    type="text"
                    placeholder="e.g. Liga MX, NFL, Regional Norteño"
                    value={newEvent.leagueOrGenre}
                    onChange={e => setNewEvent({...newEvent, leagueOrGenre: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Sat, Oct 14"
                    value={newEvent.date}
                    onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 7:00 PM CST"
                    value={newEvent.time}
                    onChange={e => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Subtitle / Matchup</label>
                <input
                  type="text"
                  placeholder="e.g. Watch Party with $7.50 Micheladas"
                  value={newEvent.subtitle}
                  onChange={e => setNewEvent({...newEvent, subtitle: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Details about the game, entertainment, and specials..."
                  value={newEvent.description}
                  onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
