import snapshot from "../data/citations.json";

// Citation counts from OpenAlex (open, free API; Google Scholar has no API and blocks scripts).
// Live counts at build time, falling back to the snapshot saved by `npm run sync:citations`.

type Counts = Record<string, number>;
type Pub = { data: { doi?: string; relatedDois?: string[]; citations?: number } };

const norm = (doi: string) => doi.toLowerCase().replace(/^https?:\/\/doi\.org\//, "");

let countsPromise: Promise<{ counts: Counts; asOf: string }> | undefined;

async function fetchCounts(dois: string[]): Promise<{ counts: Counts; asOf: string }> {
  const fallback = { counts: snapshot.counts as Counts, asOf: snapshot.fetched };
  if (dois.length === 0) return fallback;
  try {
    const url = `https://api.openalex.org/works?per-page=100&select=doi,cited_by_count&filter=doi:${dois.join("|")}&mailto=andymcdonald1985@gmail.com`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`OpenAlex returned ${response.status}`);
    const { results } = await response.json();
    const counts: Counts = { ...fallback.counts };
    for (const work of results) counts[norm(work.doi)] = work.cited_by_count;
    return { counts, asOf: new Date().toISOString().slice(0, 10) };
  } catch (error) {
    console.warn(`[citations] OpenAlex unavailable, using the saved snapshot: ${(error as Error).message}`);
    return fallback;
  }
}

export async function getCitations(pubs: Pub[]) {
  const dois = [...new Set(pubs.flatMap((pub) => [pub.data.doi, ...(pub.data.relatedDois ?? [])]).filter(Boolean).map((d) => norm(d!)))];
  countsPromise ??= fetchCounts(dois);
  const { counts, asOf } = await countsPromise;

  /** Citations for one paper: manual override, else its DOI plus any other versions. Undefined if unknown. */
  const citationsFor = (pub: Pub): number | undefined => {
    if (typeof pub.data.citations === "number") return pub.data.citations;
    const all = [pub.data.doi, ...(pub.data.relatedDois ?? [])].filter(Boolean).map((d) => norm(d!));
    const known = all.filter((doi) => doi in counts);
    return known.length ? known.reduce((sum, doi) => sum + counts[doi], 0) : undefined;
  };

  return { citationsFor, asOf };
}
