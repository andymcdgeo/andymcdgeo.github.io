import { getCollection } from "astro:content";
import type { ImageMetadata } from "astro";
import { XMLParser } from "fast-xml-parser";
import { slugifyTag } from "./slugifyTag";

// One list of writing: posts hosted on this site plus Substack posts that only live there.
// Site posts win when the same article exists in both places.

const SUBSTACK = "https://andymcdonaldgeo.substack.com";

export type WritingItem = {
  title: string;
  date: Date;
  excerpt: string;
  tags: string[];
  href: string;
  external: boolean;
  /** Substack post that needs a paid subscription */
  paid: boolean;
  /** Site posts: an astro:assets image. Substack posts: a resized CDN URL. */
  image?: ImageMetadata | string;
  imageAlt: string;
};

type SubstackPost = {
  title: string;
  subtitle?: string;
  date: Date;
  url: string;
  image?: string;
  tags: string[];
  paid: boolean;
};

// Substack uses both spellings; fold them into the tag the site already uses
const TAG_ALIASES: Record<string, string> = {
  "data-visualisation": "visualisation",
  "data-visualization": "visualisation",
};

const normaliseTitle = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "");

// Serve Substack covers through its image CDN at card size, not the full upload
const cardImage = (url?: string) =>
  url ? `https://substackcdn.com/image/fetch/w_800,c_limit,f_auto,q_auto:good/${encodeURIComponent(url)}` : undefined;

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

async function fetchJson(url: string) {
  const response = await fetch(url, { headers: { "User-Agent": "andymcdonald.scot site build" } });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.json();
}

// Full history from the archive endpoint Substack's own archive page uses (undocumented)
async function fromArchive(): Promise<SubstackPost[]> {
  const posts: SubstackPost[] = [];
  for (let offset = 0; offset < 1000; ) {
    const page = await fetchJson(`${SUBSTACK}/api/v1/archive?sort=new&offset=${offset}&limit=50`);
    if (!Array.isArray(page) || page.length === 0) break;
    for (const post of page) {
      posts.push({
        title: post.title,
        subtitle: post.subtitle ?? "",
        date: new Date(post.post_date),
        url: post.canonical_url,
        image: post.cover_image ?? undefined,
        tags: (post.postTags ?? []).map((tag: { name: string }) => tag.name),
        paid: Boolean(post.audience && post.audience !== "everyone"),
      });
    }
    offset += page.length;
  }
  return posts;
}

// Fallback: the RSS feed only carries the latest 20 posts and no tags
async function fromRss(): Promise<SubstackPost[]> {
  const response = await fetch(`${SUBSTACK}/feed`);
  if (!response.ok) throw new Error(`RSS returned ${response.status}`);
  const feed = new XMLParser({ ignoreAttributes: false }).parse(await response.text());
  const items = feed?.rss?.channel?.item ?? [];
  return (Array.isArray(items) ? items : [items]).map((item) => ({
    title: String(item.title ?? ""),
    subtitle: stripHtml(item.description),
    date: new Date(item.pubDate),
    url: item.link,
    image: item.enclosure?.["@_url"],
    tags: [],
    paid: false,
  }));
}

let substackPromise: Promise<SubstackPost[]> | undefined;

// Fetched once per build; a Substack outage means site posts only, never a failed build
export function getSubstackPosts(): Promise<SubstackPost[]> {
  substackPromise ??= fromArchive()
    .catch((error) => {
      console.warn(`[writing] Substack archive unavailable, trying RSS: ${error.message}`);
      return fromRss();
    })
    .then((posts) => posts.filter((post) => post.title && post.url && !Number.isNaN(post.date.valueOf())))
    .catch((error) => {
      console.warn(`[writing] Substack unavailable, listing site posts only: ${error.message}`);
      return [];
    });
  return substackPromise;
}

const stripMarkdown = (text: string) =>
  text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/[#>*_~\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const localExcerpt = (data: { excerpt?: string; description?: string }, body = "", wordCount = 28) => {
  const manual = data.excerpt?.trim() || data.description?.trim();
  if (manual) return manual;
  const words = stripMarkdown(body).split(" ").filter(Boolean);
  const excerpt = words.slice(0, wordCount).join(" ");
  return words.length > wordCount ? `${excerpt}...` : excerpt;
};

export async function getAllWriting(): Promise<WritingItem[]> {
  const local = await getCollection("blog");
  const localTitles = new Set(local.map((post) => normaliseTitle(post.data.title)));

  // Substack tags take the site's spelling where one exists ("ai" becomes "AI")
  const localLabels = new Map(local.flatMap((post) => post.data.tags).map((tag) => [slugifyTag(tag), tag]));
  const tidyTag = (tag: string) => {
    const aliased = TAG_ALIASES[slugifyTag(tag)] ?? tag;
    return localLabels.get(slugifyTag(aliased)) ?? aliased;
  };

  const localItems: WritingItem[] = local.map((post) => ({
    title: post.data.title,
    date: post.data.date,
    excerpt: localExcerpt(post.data, post.body),
    tags: post.data.tags,
    href: `/blog/${post.slug}`,
    external: false,
    paid: false,
    image: post.data.heroImage,
    imageAlt: post.data.heroImageAlt,
  }));

  const substackItems: WritingItem[] = (await getSubstackPosts())
    .filter((post) => !localTitles.has(normaliseTitle(post.title)))
    .map((post) => ({
      title: post.title,
      date: post.date,
      excerpt: post.subtitle ?? "",
      tags: [...new Set(post.tags.map(tidyTag))],
      href: post.url,
      external: true,
      paid: post.paid,
      image: cardImage(post.image),
      imageAlt: "",
    }));

  return [...localItems, ...substackItems].sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

// Tag list for the filters: one entry per slug, preferring the site's own spelling
export function tagLinksFor(items: WritingItem[]) {
  const bySlug = new Map<string, { label: string; local: boolean }>();
  for (const item of items) {
    for (const tag of item.tags) {
      const slug = slugifyTag(tag);
      const existing = bySlug.get(slug);
      if (!existing || (!existing.local && !item.external)) bySlug.set(slug, { label: tag, local: !item.external });
    }
  }
  return [...bySlug.entries()]
    .map(([slug, { label }]) => ({ slug, label }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
