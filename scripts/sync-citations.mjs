// Saves OpenAlex citation counts for every publication DOI to src/data/citations.json.
// The build fetches live counts too; this snapshot is its fallback if OpenAlex is unreachable.
// Run with: npm run sync:citations
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";

const PUBS = new URL("../src/content/publications/", import.meta.url);
const OUT = new URL("../src/data/citations.json", import.meta.url);

const dois = new Set();
for (const dir of await readdir(PUBS)) {
  const text = await readFile(new URL(`${dir}/index.md`, PUBS), "utf8").catch(() => "");
  const doi = text.match(/^doi:\s*"?([^"\n]+)"?/m)?.[1];
  if (doi) dois.add(doi.toLowerCase());
  const related = text.match(/^relatedDois:\s*\[([^\]]*)\]/m)?.[1];
  related?.match(/"([^"]+)"/g)?.forEach((d) => dois.add(d.replace(/"/g, "").toLowerCase()));
}

const url = `https://api.openalex.org/works?per-page=100&select=doi,cited_by_count&filter=doi:${[...dois].join("|")}&mailto=andymcdonald1985@gmail.com`;
const response = await fetch(url);
if (!response.ok) throw new Error(`OpenAlex returned ${response.status}`);
const { results } = await response.json();

const counts = {};
for (const work of results) counts[work.doi.replace("https://doi.org/", "").toLowerCase()] = work.cited_by_count;
const missing = [...dois].filter((doi) => !(doi in counts));

await mkdir(new URL(".", OUT), { recursive: true });
await writeFile(OUT, JSON.stringify({ source: "OpenAlex", fetched: new Date().toISOString().slice(0, 10), counts }, null, 2) + "\n");
console.log(`Saved citation counts for ${Object.keys(counts).length} DOIs${missing.length ? `; not in OpenAlex: ${missing.join(", ")}` : ""}`);
