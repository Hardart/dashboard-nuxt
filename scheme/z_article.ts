import { z } from 'zod'
import { categorySchema, type CategoryFormData } from './z_category'
export type ArticleStatus = 'опубликовано' | 'не опубликовано' | 'в ожидании даты'
export type Article = z.output<typeof articleSchema>
export type ArticleFormData = z.output<typeof articleFormDataSchema>
export enum STATUSES {
  Publish = 'опубликовано',
  Not_Publish = 'не опубликовано',
  Pending = 'в ожидании',
}

export const articleSchema = z.object({
  id: z.string(),
  image: z.string().optional(),
  title: z.string().min(5, 'Минимум 5 символов'),
  slug: z.string().min(5, 'Минимум 5 символов'),
  content: z.string().min(1, 'Контент новости не может быть пустым'),
  category: categorySchema,
  tags: z.array(z.string()),
  publishAt: z.coerce.date(),
  isPublished: z.boolean(),
  createdAt: z.string(),
  status: z.nativeEnum(STATUSES),
})

export const articleFormDataSchema = articleSchema
  .omit({ id: true, createdAt: true, category: true, status: true })
  .extend({ categoryId: z.string().min(16, 'Выбери категорию'), id: z.string().optional() })
