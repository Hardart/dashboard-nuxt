import { z } from 'zod'
import { categoryZodSchema } from './z_category'
export type ArticleSchema = z.output<typeof articleZodSchema>

export const articleZodSchema = z.object({
  id: z.string(),
  preview: z.string(),
  title: z.string().min(5, 'Минимум 5 символов'),
  slug: z.string().min(5, 'Минимум 5 символов'),
  content: z.string().min(5, 'Минимум 5 символов'),
  category: categoryZodSchema,
  tags: z.array(z.string()),
  publishAt: z.date(),
  isPublished: z.boolean(),
  categoryId: z.string(),
})
