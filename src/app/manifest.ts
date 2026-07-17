import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Swyng - Startups, Investors & Sports',
    short_name: 'Swyng',
    description: 'The exclusive network for LATAM\'s top founders and investors. Match on business synergies, close deals on the Padel court.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0F19',
    theme_color: '#FF6A00',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
