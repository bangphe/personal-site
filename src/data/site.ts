export const site = {
  name: 'Rizky Purnawan',
  firstName: 'Rizky',
  role: 'Backend Engineer',
  location: 'Surabaya, Indonesia',
  // Shown in the hero, first person.
  intro:
    'I build and maintain enterprise systems — ERP, big data, and internal platforms — mostly in PHP, .NET and Go. Nine years, Surabaya, Indonesia.',
  // Meta description, third person for search results.
  description:
    'Rizky Purnawan is a backend engineer in Surabaya, Indonesia, building enterprise systems — ERP, big data and internal platforms — in PHP, .NET and Go.',
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
