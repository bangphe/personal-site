// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Canonical tags, OG image URLs and the sitemap all derive from this.
  site: 'https://rizkypurnawan.com',

  redirects: {
    '/contact': '/',
  },

  integrations: [sitemap()],

  // Medium's CDN images are downloaded and re-encoded at build time, so the
  // page serves them from its own origin: no third-party requests or cookies.
  image: {
    domains: ['cdn-images-1.medium.com'],
  },

  // Plus Jakarta Sans — geometric grotesque matching the reference, and an
  // Indonesian typeface. Downloaded and self-hosted at build time.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-jakarta',
      weights: [400, 500, 600, 700, 800],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
