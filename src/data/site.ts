export const site = {
  name: 'Rizky Purnawan',
  firstName: 'Rizky',
  // TODO(verify): your one-line positioning statement.
  tagline: 'Building reliable backends',
  role: 'Backend Engineer',
  location: 'Surabaya, Indonesia',
  description:
    'Indonesian Backend Engineer building reliable, high-throughput services with Node.js, Go and PHP.',
  // TODO(verify): the public email you want on the site.
  // Deliberately NOT your account email — decide what you want exposed publicly.
  email: 'hello@example.com',
  ctaLabel: "Let's talk backend",
  // TODO(verify): drop a square photo (>=500x500) at public/profile.jpg
  avatar: '/profile.svg',
  socials: [
    { label: 'GitHub', url: 'https://github.com/bangphe', icon: 'github' },
    { label: 'LinkedIn', url: 'https://id.linkedin.com/in/rizkypurnawan', icon: 'linkedin' },
    { label: 'Medium', url: 'https://medium.com/@rizky.purnawan', icon: 'medium' },
  ],
} as const;
