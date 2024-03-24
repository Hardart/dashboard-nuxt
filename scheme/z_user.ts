import { z } from 'zod'
export type User = z.output<typeof userSchema>
export type UserFormData = z.output<typeof userFormDataSchema>

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().min(7),
  roles: z.array(z.string()),
  createdAt: z.string(),
  accessToken: z.string(),
  avatar: z.string().optional(),
  name: z.string(),
})

export const userFormDataSchema = userSchema.omit({ id: true, createdAt: true, accessToken: true }).extend({ id: z.string().optional() })
