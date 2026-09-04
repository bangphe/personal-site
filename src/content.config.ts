import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Content lives in JSON data files, not in markup — adding a role or a project
 * is a one-file edit and never touches a component.
 */

const experience = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/experience' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    start: z.string(),            // "2021-03"
    end: z.string().nullable(),   // null renders as "Present" — no dead dates to update
    location: z.string(),
    // Optional: drop a square image in public/logos/ and reference it here
    // (e.g. "/logos/kano-solution.png"). Falls back to a monogram badge.
    logo: z.string().optional(),
    url: z.url().optional(),
    employmentType: z.string().optional(),
    workMode: z.string().optional(),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    // Named engagements within one role, as LinkedIn lists them.
    projects: z.array(z.object({
      name: z.string(),
      role: z.string().optional(),
      description: z.string().optional(),
      responsibilities: z.array(z.string()).default([]),
      tools: z.array(z.string()).default([]),
    })).default([]),
    stack: z.array(z.string()),
    order: z.number(),            // manual sort beats date-sort when roles overlap
    unverified: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/projects' }),
  schema: z.object({
    name: z.string(),
    type: z.enum(['personal', 'client']),
    description: z.string(),
    platform: z.string(),
    stack: z.array(z.string()),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    featured: z.boolean().default(false),
    order: z.number(),
    unverified: z.boolean().default(false),
  }),
});

export const collections = { experience, projects };
