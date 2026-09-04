export const site = {
  name: 'Rizky Purnawan',
  firstName: 'Rizky',
  role: 'Backend Engineer',
  location: 'Surabaya, Indonesia',
  // Shown in the hero, first person.
  intro:
    'I build and maintain the systems companies run on — ERP platforms, marketplaces, and the payment flows behind them — mostly in PHP and Node.js. Working on the web since 2012, from Surabaya, Indonesia.',
  // Meta description, third person for search results.
  description:
    'Rizky Purnawan is a backend engineer in Surabaya, Indonesia, building enterprise platforms, marketplaces and payment integrations in PHP and Node.js since 2012.',
  email: 'rizkypurnawan.dp@gmail.com',
  ctaLabel: "Let's talk backend",
  linkedin: 'https://id.linkedin.com/in/rizkypurnawan',
  socials: [
    { label: 'GitHub', url: 'https://github.com/bangphe', icon: 'github', color: 'bg-blue' },
    { label: 'LinkedIn', url: 'https://id.linkedin.com/in/rizkypurnawan', icon: 'linkedin', color: 'bg-green' },
    { label: 'Medium', url: 'https://medium.com/@rizky.purnawan', icon: 'medium', color: 'bg-lilac' },
  ],
  nav: [
    { href: '/experience', label: 'Experience' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
} as const;

/** How many roles the experience page shows before deferring to LinkedIn. */
export const EXPERIENCE_LIMIT = 2;
