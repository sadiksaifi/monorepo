import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({image})=>  z.object({
		title: z.string().max(60, { message: 'Title must be less than 60 characters' }),
		description: z.string().max(160, { message: 'Description must be less than 160 characters' }),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		image: image(),
		tags: z.array(z.string()),
	}),
});

export const collections = { blog };
