import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AnalyticsTracker } from '../components/AnalyticsTracker';

export const metadata: Metadata = {
  title: 'El Maracaná Sports Bar & Grill | Hidalgo, TX | Sports, Food & Live Music',
  description:
    'El Maracaná Sports Bar & Grill in Hidalgo, TX. Eat, drink, watch NFL RedZone & Liga MX, and enjoy live Banda, Norteño, DJ Karaoke, and daily specials.',
  icons: {
    icon: '/maracana-logo.png',
    apple: '/maracana-logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BarOrPub',
  name: 'El Maracaná Sports Bar & Grill',
  image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3110 S. Jackson Rd.',
    addressLocality: 'Hidalgo',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  telephone: '+19563228814',
  servesCuisine: ['American', 'Mexican', 'Sports Bar Fare', 'Burgers', 'Wings', 'Tacos'],
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
      opens: '11:00',
      closes: '00:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday'],
      opens: '11:00',
      closes: '02:00',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta property="og:title" content="El Maracaná Sports Bar & Grill | Hidalgo, TX" />
        <meta
          property="og:description"
          content="Eat, drink, watch sports & enjoy live entertainment. Featuring NFL RedZone, Liga MX, happy hour, and daily food specials."
        />
        <meta property="og:type" content="restaurant" />
        <meta property="og:site_name" content="El Maracaná Sports Bar & Grill" />
        <meta property="og:image" content="/maracana-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="El Maracaná Sports Bar & Grill | Hidalgo, TX" />
        <meta
          name="twitter:description"
          content="The premier sports bar and live entertainment venue in Hidalgo, Texas. 3110 S. Jackson Rd. (956) 322-8814."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Permanent+Marker&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-stone-50 text-stone-900 font-sans antialiased selection:bg-amber-600 selection:text-white">
        {children}
        <AnalyticsTracker />
      </body>
    </html>
  );
}
