import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      tags: z.array(z.string()),
      heroImage: image(),
      heroImageAlt: z.string(),
      description: z.string().optional(),
      excerpt: z.string().optional(),
      featured: z.boolean().optional(),
      relatedPosts: z.array(z.string()).optional(),
      slug: z.string().optional(),
    }),
});

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      region: z.string(),
      scale: z.string(),
      keyWork: z.array(z.string()),
      tags: z.array(z.string()).optional(),
      link: z.string().optional(),
      image: z.string().optional(),
      featured: z.boolean().optional(),
      slug: z.string().optional(),
      heroImage: image().optional(),
    }),
});

const dataSources = defineCollection({
  type: "content",
  schema: z.object({
    // dataTypes must use the canonical list only; formats belong in Notes.
    title: z.string(),
    summary: z.string().optional(),
    region: z.string(),
    provider: z.string(),
    providerType: z.string().optional(),
    access: z.enum(["portal", "download", "api", "request"]),
    registrationRequired: z.boolean(),
    dataTypes: z.array(
      z.enum([
        "Well Log Data",
        "Seismic Data",
        "Production Data",
        "Well / Borehole Metadata",
        "Geological Models",
        "Geophysical Surveys",
        "Reports & Documents",
      ])
    ),
    coverage: z.string().optional(),
    formats: z.string().optional(),
    licence: z.string(),
    licenceUrl: z.string().url().optional(),
    primaryUrl: z.string().url(),
    lastChecked: z.date(),
    slug: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const publications = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    year: z.number().int(),
    venue: z.string(),
    type: z.enum(["journal", "conference"]),
    /** Research theme the Publications page groups by */
    theme: z.enum(["ml", "reservoir"]).optional(),
    /** Short venue label (SPWLA, SPE...); worked out from venue when not set */
    venueShort: z.string().optional(),
    doi: z.string().optional(),
    url: z.string().optional(),
    pdf: z.string().optional(),
    tags: z.array(z.string()).optional(),
    abstract: z.string().optional(),
    /** Shown as a key paper at the top of the Publications page */
    featured: z.boolean().optional(),
    /** One-line summary for the featured tile */
    summary: z.string().optional(),
    /** Other versions of the same work (e.g. the symposium paper); their citations are added in */
    relatedDois: z.array(z.string()).optional(),
    /** Manual citation count, e.g. from Google Scholar; overrides OpenAlex */
    citations: z.number().int().optional(),
  }),
});

export const collections = { blog, publications, projects, "data-sources": dataSources };
