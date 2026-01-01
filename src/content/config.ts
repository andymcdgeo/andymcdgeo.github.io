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

const publications = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    year: z.number().int(),
    venue: z.string(),
    type: z.enum(["journal", "conference"]),
    doi: z.string().optional(),
    url: z.string().optional(),
    pdf: z.string().optional(),
    tags: z.array(z.string()).optional(),
    abstract: z.string().optional(),
  }),
});

export const collections = { blog, publications };
