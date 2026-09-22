import React, { useState, useEffect, useMemo } from 'react';
import { GALLERY_PHOTOS } from '../data/venueData';
import { GalleryPhoto, GalleryCategory } from '../types';
import { Image, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const PAGE_SIZE = 12;

// Tab order and labels; a tab only appears once at least one photo uses that category
const CATEGORY_TABS: { id: GalleryCategory; label: string }[] = [
  { id: 'watch-party', label: 'Fiesta & Watch Parties' },
  { id: 'fans', label: 'Game Day Fans' },
  { id: 'guests', label: 'Friends & Family' },
  { id: 'drinks', label: 'Beer & Drinks' },
  { id: 'food', label: 'Food & Specials' },
  { id: 'entertainment', label: 'Live Bands & Stage' },
  { id: 'atmosphere', label: 'Stadium Atmosphere' },
];

const CATEGORY_LABEL: Record<GalleryCategory, string> = Object.fromEntries(
  CATEGORY_TABS.map(t => [t.id, t.label])
) as Record<GalleryCategory, string>;

// Number of masonry columns for the current screen width
function useColumnCount() {
  const get = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
  const [count, setCount] = useState(get);
  useEffect(() => {
    const onResize = () => setCount(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return count;
}

export const PhotoGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | GalleryCategory>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const columnCount = useColumnCount();

  const tabs = useMemo(
    () => [
      { id: 'all' as const, label: 'All Photos' },
      ...CATEGORY_TABS.filter(t => GALLERY_PHOTOS.some(p => p.category === t.id)),
    ],
    []
  );

  const filteredPhotos = useMemo(
    () => (activeTab === 'all' ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter(p => p.category === activeTab)),
    [activeTab]
  );
  const shownPhotos = filteredPhotos.slice(0, visibleCount);
  const remaining = filteredPhotos.length - shownPhotos.length;

  // Deal photos out left-to-right so the order stays stable when "Show more" adds photos
  const columns = useMemo(() => {
    const cols: GalleryPhoto[][] = Array.from({ length: columnCount }, () => []);
    shownPhotos.forEach((photo, i) => cols[i % columnCount].push(photo));
    return cols;
  }, [shownPhotos, columnCount]);

  const handleTabChange = (id: 'all' | GalleryCategory) => {
    setActiveTab(id);
    setVisibleCount(PAGE_SIZE);
  };

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    setSelectedPhoto(filteredPhotos[(currentIndex + 1) % filteredPhotos.length]);
  };

  const handlePrev = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    setSelectedPhoto(filteredPhotos[(currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length]);
  };

  // Keyboard controls for the lightbox
  useEffect(() => {
    if (!selectedPhoto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <section id="gallery" className="py-20 bg-stone-100/70 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-stone-200 text-amber-800 text-xs font-bold uppercase tracking-widest">
            <Image className="w-3.5 h-3.5 text-amber-700" />
            <span>Game Day Moments</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase text-stone-900 tracking-tight leading-none">
            Photo <span className="text-amber-700">Gallery</span>
          </h2>
          <p className="text-stone-700 text-base font-body">
            Game-day crowds, watch parties, and good times with friends and family at El Maracaná.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto md:overflow-visible md:flex-wrap md:justify-center pb-4 mb-6 no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              id={`gallery-filter-${tab.id}`}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
                activeTab === tab.id
                  ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Photos: masonry columns, photos keep their natural shape */}
        <div className="flex items-start gap-5">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex-1 min-w-0 flex flex-col gap-5">
              {column.map(photo => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                  aria-label={`View ${photo.title}`}
                  className="group relative block w-full rounded-2xl overflow-hidden bg-stone-200 border border-stone-200 cursor-pointer shadow-xs hover:shadow-md transition-shadow text-left"
                  style={{ aspectRatio: photo.width && photo.height ? `${photo.width} / ${photo.height}` : '4 / 3' }}
                >
                  <img
                    src={photo.thumbUrl ?? photo.imageUrl}
                    alt={`${photo.title}: ${photo.caption}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mb-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Full Photo</span>
                    </div>
                    <h4 className="font-display text-lg font-bold uppercase text-white leading-tight">
                      {photo.title}
                    </h4>
                    <p className="text-[11px] text-stone-200 line-clamp-1 font-body mt-0.5">
                      {photo.caption}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Show more */}
        {remaining > 0 && (
          <div className="mt-10 text-center">
            <button
              id="gallery-show-more"
              onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
              className="px-6 py-3 rounded-xl font-bold text-sm bg-stone-900 hover:bg-stone-800 text-white shadow-sm cursor-pointer transition-all active:scale-95"
            >
              Show More Photos ({remaining} more)
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.title}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              id="gallery-modal-close"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-950/80 text-white hover:bg-stone-800 border border-stone-700 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev / Next controls */}
            {filteredPhotos.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-stone-950/80 text-white hover:bg-stone-800 border border-stone-700 transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-stone-950/80 text-white hover:bg-stone-800 border border-stone-700 transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Big Image */}
            <div className="h-[55vh] sm:h-[65vh] w-full bg-stone-950">
              <img
                src={selectedPhoto.imageUrl}
                alt={`${selectedPhoto.title}: ${selectedPhoto.caption}`}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Caption footer */}
            <div className="p-5 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {CATEGORY_LABEL[selectedPhoto.category]}
                </span>
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-stone-300 font-body mt-0.5">
                  {selectedPhoto.caption}
                </p>
              </div>
              <div className="shrink-0 text-right text-xs text-stone-400 font-mono">
                El Maracaná • Hidalgo, TX
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
