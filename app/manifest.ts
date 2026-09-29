import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'GH Clinic — Cabinet Médico-Esthétique Dr. Ghaouat Sarra',
    short_name: 'GH Clinic',
    description: "Plateforme d'excellence en médecine esthétique et laser à Khemis Miliana (Algérie).",
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#FAF8F5',
    theme_color: '#FAF8F5',
    categories: ['medical', 'health', 'lifestyle'],
    shortcuts: [
      {
        name: 'Prendre RDV',
        short_name: 'RDV',
        description: 'Réservez votre consultation avec Dr. Ghaouat Sarra',
        url: '/?book=direct',
        icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }],
      },
      {
        name: 'Tarifs & Soins',
        short_name: 'Tarifs',
        description: 'Consultez les prix Laser, Botox et Injections en DZD',
        url: '/#tarification',
        icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }],
      },
      {
        name: 'Cabinet & Accès',
        short_name: 'Localisation',
        description: 'Itinéraire vers Khemis Miliana',
        url: '/#location',
        icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }],
      },
    ],
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
