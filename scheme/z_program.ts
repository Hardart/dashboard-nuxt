import { z } from 'zod'
import { userSchema } from './z_user'
export type Program = z.output<typeof programSchema>
// export type UserFormData = z.output<typeof userFormDataSchema>

const scheduleSchema = z.object({
  dayId: z.array(z.number()),
  start: z.string(),
  end: z.string(),
  isReplay: z.boolean(),
})

export const programSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  hosts: z.array(userSchema),
  schedule: z.array(scheduleSchema),
})

// export const userFormDataSchema = programSchema.omit({ id: true, createdAt: true, accessToken: true, roles: true }).extend({
//   id: z.string().optional(),
//   password: z.string({ required_error: 'Обязательное поле' }),
//   password_new: z.string({ required_error: 'Обязательное поле' }).min(7, 'Минимум 7 знаков'),
//   roles: z.array(z.string()).optional(),
//   firstName: z.string({ required_error: 'Обязательное поле' }).min(3, 'Минимум 3 знака'),
//   lastName: z.string({ required_error: 'Обязательное поле' }).min(3, 'Минимум 3 знака'),
// })
