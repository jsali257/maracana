export interface WeeklySpecial {
  day: string;
  dayIndex: number; // 0 for Sunday, 1 for Monday, etc.
  title: string;
  badge: string;
  subtitle: string;
  priceNote?: string;
  items: {
    name: string;
    price?: string;
    description: string;
  }[];
  entertainment?: string;
  highlightColor: 'green' | 'amber' | 'blue' | 'red' | 'purple';
  bannerImage: string;
}

export type EventCategory = 'all' | 'nfl' | 'soccer' | 'live-music' | 'karaoke' | 'combat';

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  category: EventCategory;
  date: string; // e.g. "Every Sunday" or "Sat, Oct 12"
  displayDate: string;
  time: string;
  leagueOrGenre: string;
  featuredBadge?: string;
  description: string;
  image: string;
  specialPromo?: string;
  tvScreenCoverage?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category:
    | 'apps-wings'
    | 'burgers-tacos'
    | 'hot-dogs'
    | 'steaks'
    | 'salads'
    | 'sides'
    | 'kids'
    | 'extras'
    | 'dessert'
    | 'beverages'
    | 'drinks'
    | 'margaritas';
  price?: string;
  description?: string;
  isSpecialDay?: string;
  specialPrice?: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  image?: string;
  imagePosition?: string; // CSS object-position, for keeping tall photos framed in the wide card
}

export type GalleryCategory =
  | 'watch-party'
  | 'fans'
  | 'guests'
  | 'drinks'
  | 'food'
  | 'entertainment'
  | 'atmosphere';

export interface GalleryPhoto {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string; // full-size, shown in the lightbox
  thumbUrl?: string; // smaller version for the grid (falls back to imageUrl)
  width?: number; // natural size of imageUrl, used to reserve space while loading
  height?: number;
  caption: string;
}
