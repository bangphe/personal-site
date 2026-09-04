import { XMLParser } from 'fast-xml-parser';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

export interface Post {
  title: string;
  url: string;
  date: Date;
  tags: string[];
  excerpt: string;
  image?: string;
}

const FEED = 'https://medium.com/@rizky.purnawan/feed';

// Lives under node_modules so it is already gitignored and is cleared by a
// reinstall — correct cache semantics without touching .gitignore.
const CACHE_FILE = join(process.cwd(), 'node_modules/.cache/medium/feed.xml');
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

async function readCache(maxAgeMs: number): Promise<string | null> {
  try {
    const { mtimeMs } = await stat(CACHE_FILE);
    if (Date.now() - mtimeMs > maxAgeMs) return null;
    return await readFile(CACHE_FILE, 'utf8');
  } catch {
    return null;
  }
}

async function writeCache(xml: string): Promise<void> {
  try {
    await mkdir(dirname(CACHE_FILE), { recursive: true });
    await writeFile(CACHE_FILE, xml, 'utf8');
  } catch {
    // A cache we cannot write is not worth failing a build over.
  }
}

/** Strip Medium's RSS tracking suffix so links stay clean. */
function cleanUrl(url: string): string {
  return url.split('?source=')[0];
}

function toText(html: string): string {
  return html
    .replace(/<figure[\s\S]*?<\/figure>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerpt(text: string, max = 150): string {
  // Medium prefixes most posts with the hero image's photo credit — drop it.
  const body = text.replace(/^Photo by .{0,80}? on Unsplash\s*/i, '');
  if (body.length <= max) return body;
  return body.slice(0, body.lastIndexOf(' ', max)).trimEnd() + '…';
}

/**
 * Fetched at build time, so posts refresh on each deploy rather than costing
 * the visitor a request. Never throws: a feed outage degrades to an empty
 * state on the page instead of failing the build.
 */
let inflight: Promise<Post[]> | null = null;

/** Cached for the life of the process so a build fetches the feed once. */
export async function getMediumPosts(limit = 9): Promise<Post[]> {
  inflight ??= loadPosts();
  return (await inflight).slice(0, limit);
}

async function loadPosts(): Promise<Post[]> {
  let xml: string | null = null;

  // The dev server re-runs this on every request to /blog. Without a cache
  // that is a live network round-trip per page view, which made the page take
  // seconds to open. Production builds always fetch fresh.
  if (import.meta.env.DEV) {
    xml = await readCache(CACHE_TTL_MS);
  }

  if (xml === null) {
    try {
      const res = await fetch(FEED, {
        headers: { 'user-agent': 'personal-site-build/1.0' },
        signal: AbortSignal.timeout(15_000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      xml = await res.text();
      await writeCache(xml);
    } catch (err) {
      // Fall back to a stale cache before giving up, so a feed outage cannot
      // blank the blog page or break a deploy.
      xml = await readCache(Number.POSITIVE_INFINITY);
      if (xml === null) {
        console.warn(`[medium] feed unavailable, rendering empty state: ${err}`);
        return [];
      }
      console.warn(`[medium] feed unavailable, using stale cache: ${err}`);
    }
  }

  try {
    const parsed = new XMLParser({
      ignoreAttributes: false,
      cdataPropName: '__cdata',
    }).parse(xml);

    const raw = parsed?.rss?.channel?.item;
    if (!raw) return [];
    const items = Array.isArray(raw) ? raw : [raw];

    return items.map((item): Post => {
      const unwrap = (v: unknown): string =>
        typeof v === 'string' ? v
          : v && typeof v === 'object' && '__cdata' in v ? String((v as any).__cdata)
          : '';

      const body = unwrap(item['content:encoded']);
      const cats = item.category ?? [];

      return {
        title: unwrap(item.title),
        url: cleanUrl(unwrap(item.link) || String(item.link ?? '')),
        date: new Date(item.pubDate),
        tags: (Array.isArray(cats) ? cats : [cats]).map(unwrap).filter(Boolean).slice(0, 3),
        excerpt: excerpt(toText(body)),
        image: /<img[^>]+src="([^"]+)"/.exec(body)?.[1],
      };
    });
  } catch (err) {
    console.warn(`[medium] could not parse feed: ${err}`);
    return [];
  }
}
