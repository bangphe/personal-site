// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO(verify): swap to https://rizkypurnawan.com once the domain is registered.
  // Must be set before deploying — sitemap + canonical + OG URLs derive from it.
  site: 'https://rizkypurnawan.pages.dev',

  integrations: [sitemap()],

  // Downloaded and self-hosted at build time: no request to Google at runtime,
  // and no render-blocking stylesheet.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
