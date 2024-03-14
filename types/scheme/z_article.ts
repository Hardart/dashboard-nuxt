import { z } from 'zod'
import { categorySchema } from './z_category'
export type ArticleType = z.output<typeof articleSchema>

export const articleSchema = z.object({
  id: z.string(),
  preview: z.string().optional(),
  title: z.string().min(5, 'Минимум 5 символов'),
  slug: z.string().min(5, 'Минимум 5 символов'),
  content: z.string(),
  category: categorySchema,
  tags: z.array(z.string()),
  publishAt: z.date(),
  isPublished: z.boolean(),
})
