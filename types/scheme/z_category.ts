import { z } from 'zod'

export type CategorySchema = z.output<typeof categoryZodSchema>

export const categoryZodSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
})
