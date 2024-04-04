import { z } from 'zod'
import { userSchema } from './z_user'
export type Program = z.output<typeof programSchema>
export type ProgramSchedule = z.output<typeof scheduleSchema>
export type ProgramFormData = z.output<typeof programFormData>

export interface Weekday {
  id: number
  title: {
    full: string
    short: string
  }
  selected: boolean
}

const scheduleSchema = z.object({
  dayId: z.array(z.number()),
  start: z.object({
    hh: z.string(),
    mm: z.string()
  }),
  end: z.object({
    hh: z.string(),
    mm: z.string()
  }),
  isReplay: z.boolean()
})

export const programSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  hosts: z.array(userSchema),
  schedule: z.array(scheduleSchema)
})

export const programFormData = programSchema.omit({ id: true }).extend({
  id: z.string().optional()
})
