// Saves the Substack post list to src/data/substack-posts.json.
// Substack blocks requests from GitHub's build servers, so the build falls back to this snapshot.
// Run locally with: npm run sync:substack
import { writeFile, mkdir } from "node:fs/promises";

const SUBSTACK = "https://andymcdonaldgeo.substack.com";
const OUT = new URL("../src/data/substack-posts.json", import.meta.url);

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
  Accept: "application/json",
};

const posts = [];
for (let offset = 0; offset < 1000; ) {
  const response = await fetch(`${SUBSTACK}/api/v1/archive?sort=new&offset=${offset}&limit=50`, { headers });
  if (!response.ok) throw new Error(`Substack archive returned ${response.status}`);
  const page = await response.json();
  if (!Array.isArray(page) || page.length === 0) break;
  for (const post of page) {
    posts.push({
      title: post.title,
      subtitle: post.subtitle ?? "",
      date: post.post_date,
      url: post.canonical_url,
      image: post.cover_image ?? null,
      tags: (post.postTags ?? []).map((tag) => tag.name),
      paid: Boolean(post.audience && post.audience !== "everyone"),
    });
  }
  offset += page.length;
}

if (posts.length === 0) throw new Error("No posts returned; snapshot left unchanged");

await mkdir(new URL(".", OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(posts, null, 2) + "\n");
console.log(`Saved ${posts.length} Substack posts (newest: ${posts[0].date.slice(0, 10)} ${posts[0].title})`);
