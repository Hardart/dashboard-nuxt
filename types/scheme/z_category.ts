import { z } from 'zod'

export type CategoryType = z.output<typeof categorySchema>

export const categorySchema = z.object({
  id: z.string().min(16, 'id'),
  title: z.string(),
  slug: z.string(),
})
