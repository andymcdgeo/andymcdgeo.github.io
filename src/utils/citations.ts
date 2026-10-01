import snapshot from "../data/citations.json";

// Citation counts from OpenAlex (open, free API; Google Scholar has no API and blocks scripts).
// Live counts at build time, falling back to the snapshot saved by `npm run sync:citations`.

type Counts = Record<string, number>;
type ByYear = Record<string, Record<string, number>>;
type Pub = { data: { doi?: string; relatedDois?: string[]; citations?: number } };

const norm = (doi: string) => doi.toLowerCase().replace(/^https?:\/\/doi\.org\//, "");

type Data = { counts: Counts; byYear: ByYear; asOf: string };
let dataPromise: Promise<Data> | undefined;

async function fetchData(dois: string[]): Promise<Data> {
  const fallback: Data = {
    counts: snapshot.counts as Counts,
    byYear: ((snapshot as { byYear?: ByYear }).byYear ?? {}) as ByYear,
    asOf: snapshot.fetched,
  };
  if (dois.length === 0) return fallback;
  try {
    const url = `https://api.openalex.org/works?per-page=100&select=doi,cited_by_count,counts_by_year&filter=doi:${dois.join("|")}&mailto=andymcdonald1985@gmail.com`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`OpenAlex returned ${response.status}`);
    const { results } = await response.json();
    const counts: Counts = { ...fallback.counts };
    const byYear: ByYear = { ...fallback.byYear };
    for (const work of results) {
      const doi = norm(work.doi);
      counts[doi] = work.cited_by_count;
      byYear[doi] = Object.fromEntries((work.counts_by_year ?? []).map((row) => [row.year, row.cited_by_count]));
    }
    return { counts, byYear, asOf: new Date().toISOString().slice(0, 10) };
  } catch (error) {
    console.warn(`[citations] OpenAlex unavailable, using the saved snapshot: ${(error as Error).message}`);
    return fallback;
  }
}

const doisOf = (pub: Pub) => [pub.data.doi, ...(pub.data.relatedDois ?? [])].filter(Boolean).map((d) => norm(d!));

export async function getCitations(pubs: Pub[]) {
  dataPromise ??= fetchData([...new Set(pubs.flatMap(doisOf))]);
  const { counts, byYear, asOf } = await dataPromise;

  /** Citations for one paper: manual override, else its DOI plus any other versions. Undefined if unknown. */
  const citationsFor = (pub: Pub): number | undefined => {
    if (typeof pub.data.citations === "number") return pub.data.citations;
    const known = doisOf(pub).filter((doi) => doi in counts);
    return known.length ? known.reduce((sum, doi) => sum + counts[doi], 0) : undefined;
  };

  /** Citations per year (all versions combined), from `fromYear` to this year */
  const citationsByYear = (pub: Pub, fromYear: number) => {
    const thisYear = new Date().getFullYear();
    const years = Array.from({ length: Math.max(1, thisYear - fromYear + 1) }, (_, i) => fromYear + i);
    return years.map((year) => ({
      year,
      count: doisOf(pub).reduce((sum, doi) => sum + (byYear[doi]?.[year] ?? 0), 0),
    }));
  };

  return { citationsFor, citationsByYear, asOf };
}
