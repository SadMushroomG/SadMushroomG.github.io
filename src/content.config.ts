import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({
    base: './source/_posts',
    pattern: '**/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, '')
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    tags: z.union([z.string(), z.array(z.string()), z.null()]).optional(),
    categories: z.union([z.string(), z.array(z.string()), z.null()]).optional(),
    mathjax: z.boolean().optional()
  })
});

export const collections = { posts };
