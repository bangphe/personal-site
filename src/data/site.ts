export const site = {
  name: 'Rizky Purnawan',
  firstName: 'Rizky',
  // TODO(verify): your one-line positioning statement — this is the big headline.
  headline: 'Building reliable backends',
  role: 'Backend Engineer',
  location: 'Surabaya, Indonesia',
  description:
    'Indonesian Backend Engineer building reliable, high-throughput services with Node.js, Go and PHP.',
  email: 'rizkypurnawan.dp@gmail.com',
  ctaLabel: "Let's talk backend",
  linkedin: 'https://id.linkedin.com/in/rizkypurnawan',
  // TODO(verify): drop a square photo (>=500x500) at public/profile.jpg,
  // then change this to '/profile.jpg'.
  avatar: '/profile.svg',
  socials: [
    { label: 'GitHub', url: 'https://github.com/bangphe', icon: 'github', color: 'bg-blue' },
    { label: 'LinkedIn', url: 'https://id.linkedin.com/in/rizkypurnawan', icon: 'linkedin', color: 'bg-green' },
    { label: 'Medium', url: 'https://medium.com/@rizky.purnawan', icon: 'medium', color: 'bg-pink' },
  ],
  nav: [
    { href: '/about', label: 'About' },
    { href: '/experience', label: 'Experience' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ],
} as const;

/** How many roles the experience page shows before deferring to LinkedIn. */
export const EXPERIENCE_LIMIT = 2;
