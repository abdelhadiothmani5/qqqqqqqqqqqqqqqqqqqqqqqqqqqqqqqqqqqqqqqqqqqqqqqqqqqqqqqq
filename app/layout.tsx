import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF8F5' },
    { media: '(prefers-color-scheme: dark)', color: '#0C0A09' },
  ],
};

export const metadata: Metadata = {
  title: 'GH Clinic | Cabinet Médico-Esthétique Dr. Ghaouat Sarra — Khemis Miliana',
  description: 'Clinique de référence en médecine esthétique et laser à Khemis Miliana, Algérie. Épilation Laser, Botox, Acide Hyaluronique, Hydrafacial, PRP, Skinboosters & Peelings par Dr. Ghaouat Sarra.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'GH Clinic',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/pwa-192x192.png',
    apple: '/apple-touch-icon.png',
  },
  keywords: [
    'Aesthetic Clinic Khemis Miliana',
    'Laser Hair Removal Khemis Miliana',
    'Botox Khemis Miliana',
    'Hydrafacial Khemis Miliana',
    'PRP Khemis Miliana',
    'Cabinet médico-esthétique Dr Ghaouat Sarra',
    'Médecine esthétique Algérie',
    'Épilation laser Aïn Defla',
    'Injections acide hyaluronique Algérie',
    'Soins visage Khemis Miliana'
  ],
  authors: [{ name: 'Dr. Ghaouat Sarra', url: 'https://www.instagram.com/gh_clinic10/' }],
  creator: 'Dr. Ghaouat Sarra',
  publisher: 'GH Clinic',
  metadataBase: new URL('https://ghclinic-dz.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GH Clinic | Cabinet Médico-Esthétique Dr. Ghaouat Sarra',
    description: "L'art de la médecine esthétique et des soins laser d'exception à Khemis Miliana, Algérie. Réservez votre consultation personnalisée.",
    url: 'https://ghclinic-dz.com',
    siteName: 'GH Clinic Dr. Ghaouat Sarra',
    locale: 'fr_DZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GH Clinic | Médecine Esthétique Dr. Ghaouat Sarra',
    description: 'Soins médico-esthétiques de haute précision à Khemis Miliana, Algérie.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'GH Clinic — Cabinet Médico-Esthétique Dr. Ghaouat Sarra',
    description: 'Cabinet médical spécialisé en médecine esthétique, épilation laser de dernière génération, injections de Botox et acide hyaluronique, soins Hydrafacial, PRP et régénération cutanée.',
    url: 'https://ghclinic-dz.com',
    telephone: '+213550000000',
    priceRange: '3000 DZD - 45000 DZD',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Centre-ville, Boulevard Principal',
      addressLocality: 'Khemis Miliana',
      addressRegion: 'Aïn Defla',
      postalCode: '44225',
      addressCountry: 'DZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.2619,
      longitude: 2.2206,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    medicalSpecialty: ['Dermatology', 'PlasticSurgery', 'AestheticMedicine'],
    founder: {
      '@type': 'Person',
      name: 'Dr. Ghaouat Sarra',
      jobTitle: 'Médecin Esthétique & Laseriste',
    },
    sameAs: [
      'https://www.instagram.com/gh_clinic10/',
      'https://www.facebook.com/Drsarraghaouat/',
      'https://www.google.com/maps/place/Cabinet+m%C3%A9dico-%C3%A9sthetique+DOCTEUR+GHAOUAT+SARRA/'
    ],
  };

  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GH Clinic" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('gh_clinic_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen bg-[#FAF8F5] dark:bg-[#0C0A09] text-[#292524] dark:text-[#F5F5F4] font-sans antialiased selection:bg-[#E8B4B8]/40 dark:selection:bg-[#9E2A50]/40 selection:text-[#1C1917] dark:selection:text-[#FAF8F5] transition-colors duration-300"
        style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}
        suppressHydrationWarning
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
