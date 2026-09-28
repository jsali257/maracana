import type { Metadata } from 'next';
import MenuPageContent from '../../components/MenuPageContent';

export const metadata: Metadata = {
  title: 'Full Menu',
  description:
    'Browse the full food menu at El Maracaná Sports Bar & Grill in Hidalgo, TX — tacos, burgers, steaks, wings, salads, and game-day favorites prepared fresh to order.',
  alternates: {
    canonical: '/menu',
  },
  openGraph: {
    title: 'Full Menu | El Maracaná Sports Bar & Grill',
    description:
      'Tacos, burgers, steaks, wings, salads, and game-day favorites prepared fresh to order at El Maracaná Sports Bar & Grill in Hidalgo, TX.',
    url: '/menu',
  },
};

export default function MenuPage() {
  return <MenuPageContent />;
}
