import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AnalyticsTracker } from '../components/AnalyticsTracker';

const SITE_URL = 'https://elmaracanabar.com';
const OG_IMAGE = '/video/hero-poster.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'El Maracaná Sports Bar & Grill | Hidalgo, TX',
    template: '%s | El Maracaná Sports Bar & Grill',
  },
  description:
    'El Maracaná Sports Bar & Grill in Hidalgo, TX. Eat, drink, watch NFL RedZone & Liga MX, and enjoy live Banda, Norteño, DJ Karaoke, and daily specials.',
  keywords: [
    'sports bar Hidalgo TX',
    'Hidalgo Texas restaurant',
    'NFL RedZone bar',
    'Liga MX watch party',
    'happy hour Hidalgo',
    'live music Hidalgo TX',
    'wings and tacos Hidalgo',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/maracana-logo.png',
    apple: '/maracana-logo.png',
  },
  openGraph: {
    title: 'El Maracaná Sports Bar & Grill | Hidalgo, TX',
    description:
      'Eat, drink, watch sports & enjoy live entertainment. Featuring NFL RedZone, Liga MX, happy hour, and daily food specials.',
    url: '/',
    siteName: 'El Maracaná Sports Bar & Grill',
    images: [
      {
        url: OG_IMAGE,
        width: 1600,
        height: 900,
        alt: 'El Maracaná Sports Bar & Grill in Hidalgo, TX',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Maracaná Sports Bar & Grill | Hidalgo, TX',
    description:
      'The premier sports bar and live entertainment venue in Hidalgo, Texas. 3110 S. Jackson Rd. (956) 322-8814.',
    images: [OG_IMAGE],
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
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  logo: `${SITE_URL}/maracana-logo.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3110 S. Jackson Rd.',
    addressLocality: 'Hidalgo',
    addressRegion: 'TX',
    postalCode: '78557',
    addressCountry: 'US',
  },
  telephone: '+19563228814',
  servesCuisine: ['American', 'Mexican', 'Sports Bar Fare', 'Burgers', 'Wings', 'Tacos'],
  priceRange: '$$',
  acceptsReservations: 'True',
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
