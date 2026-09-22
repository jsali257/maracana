import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, VENUE_INFO } from '../data/venueData';
import { MenuItem } from '../types';
import { Utensils, Search, Phone, Camera } from 'lucide-react';

interface MenuSectionProps {
  onOpenReservation: () => void;
}

// Food categories in display order (drinks live in a separate menu)
const CATEGORIES: { id: MenuItem['category']; label: string }[] = [
  { id: 'apps-wings', label: 'Apps & Wings' },
  { id: 'burgers-tacos', label: 'Burgers & Tacos' },
  { id: 'hot-dogs', label: 'Hot Dogs' },
  { id: 'steaks', label: 'Steaks' },
  { id: 'salads', label: 'Salads' },
  { id: 'sides', label: 'Sides' },
  { id: 'kids', label: 'Kids Meals' },
  { id: 'extras', label: 'Extras' },
  { id: 'dessert', label: 'Dessert' },
];

const MenuCard: React.FC<{ item: MenuItem }> = ({ item }) => (
  <div className="rounded-2xl bg-stone-50/70 border border-stone-200 p-5 flex flex-col hover:bg-stone-50 transition-colors">
    {/* Photo, or a "coming soon" placeholder so every card lines up */}
    <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-4 border border-stone-200 bg-stone-100">
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${item.name} photo coming soon`}
          className="w-full h-full flex flex-col items-center justify-center gap-2 bg-linear-to-br from-stone-100 to-stone-200"
        >
          <img
            src="/maracana-logo.png"
            alt=""
            aria-hidden
            className="w-16 h-16 object-contain opacity-20 grayscale"
          />
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-stone-500">
            <Camera className="w-3.5 h-3.5" />
            Photo Coming Soon
          </span>
        </div>
      )}
      {item.isSpecialDay && (
        <div className="absolute top-2 left-2 bg-stone-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
          {item.isSpecialDay}
        </div>
      )}
    </div>

    <div className="flex items-start justify-between gap-3">
      <h3 className="font-display text-xl font-bold uppercase text-stone-900 leading-tight">
        {item.name}
      </h3>
      {item.price && (
        <div className="text-right shrink-0">
          <div className="font-display text-xl font-black text-stone-900">
            {item.price}
          </div>
          {item.specialPrice && (
            <div className="text-xs font-bold text-amber-800">
              {item.specialPrice}
            </div>
          )}
        </div>
      )}
    </div>

    {item.description && (
      <p className="text-xs text-stone-700 font-body leading-relaxed mt-2">
        {item.description}
      </p>
    )}
  </div>
);

export const MenuSection: React.FC<MenuSectionProps> = ({ onOpenReservation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [{ id: 'all', label: 'Full Menu' }, ...CATEGORIES];

  const groups = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CATEGORIES
      .filter(cat => activeCategory === 'all' || cat.id === activeCategory)
      .map(cat => ({
        ...cat,
        items: MENU_ITEMS.filter(item =>
          item.category === cat.id &&
          (!q ||
            item.name.toLowerCase().includes(q) ||
            (item.description ?? '').toLowerCase().includes(q))
        ),
      }))
      .filter(group => group.items.length > 0);
  }, [activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-amber-800 text-xs font-bold uppercase tracking-widest">
            <Utensils className="w-3.5 h-3.5 text-amber-700" />
            <span>Scratch Kitchen</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase text-stone-900 tracking-tight leading-none">
            Food <span className="text-amber-700">Menu</span>
          </h2>
          <p className="text-stone-700 text-base sm:text-lg font-body">
            Tacos, burgers, steaks, salads, and game-day favorites prepared fresh to order.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col items-center gap-4 mb-10">

          {/* Search Box */}
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400"
            />
          </div>

          {/* Category Tabs: scroll sideways on phones, wrap on larger screens */}
          <div className="flex items-center gap-2 overflow-x-auto md:overflow-visible md:flex-wrap md:justify-center w-full pb-2 md:pb-0 no-scrollbar">
            {tabs.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`menu-cat-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* Menu Items, grouped by category */}
        <div className="space-y-12 mb-12">
          {groups.map(group => (
            <div key={group.id}>
              {activeCategory === 'all' && (
                <div className="flex items-center gap-4 mb-5">
                  <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-stone-900 tracking-tight">
                    {group.label}
                  </h3>
                  <span className="h-px flex-1 bg-stone-200" />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.items.map(item => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
          {groups.length === 0 && (
            <p className="text-center text-sm text-stone-500 py-10">
              No menu items match "{searchQuery}".
            </p>
          )}
        </div>

        {/* Bottom Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-stone-100 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display text-2xl font-black uppercase text-stone-900">
              Join Us for Game Day or Family Dining
            </h4>
            <p className="text-xs sm:text-sm text-stone-600">
              Dine in at 3110 S. Jackson Rd. or call ahead for table reservations and to-go orders.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              id="menu-reserve-table-btn"
              onClick={onOpenReservation}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-stone-900 hover:bg-stone-800 text-white cursor-pointer transition-colors"
            >
              Reserve Table
            </button>
            <a
              id="menu-call-orders-btn"
              href={`tel:${VENUE_INFO.phoneRaw}`}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-stone-600" />
              <span>(956) 322-8814</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
