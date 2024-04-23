import { z } from 'zod'
import { userSchema } from './z_user'
export type Program = z.output<typeof programSchema>
export type Schedule = z.output<typeof scheduleSchema>
export type ScheduleProperty = z.output<typeof schedulePropertySchema>

export interface Weekday {
  id: number
  title: {
    full: string
    short: string
  }
  selected: boolean
}

const cellWidthSchema = z.object({
  startFromId: z.number(),
  width: z.number()
})

const schedulePropertySchema = z.object({
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

const scheduleSchema = z.object({
  weekdayIds: z.array(z.number()),
  properties: z.array(schedulePropertySchema),
  sizes: z.array(cellWidthSchema).optional()
})

export const programSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  color: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  hosts: z.array(userSchema),
  schedule: z.array(scheduleSchema),
  isPublished: z.boolean()
})
