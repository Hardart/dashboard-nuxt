import { z } from 'zod'
import { userSchema } from './z_user'
export type Program = z.output<typeof programSchema>
export type ProgramSchedule = z.output<typeof scheduleSchema>
export type ProgramSchedulePropsItem = z.output<typeof schedulePropsItemSchema>
export type ProgramFormData = z.output<typeof programFormData>
export type ProgramForTable = z.output<typeof programForTableSchema>
export type ProgramStateSchema = z.output<typeof programStateSchema>

export interface Weekday {
  id: number
  title: {
    full: string
    short: string
  }
  selected: boolean
}

const schedulePropsItemSchema = z.object({
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
  properties: z.array(schedulePropsItemSchema)
})

export const programSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  color: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  hosts: z.array(userSchema),
  schedule: z.array(scheduleSchema)
})

export const programForTableSchema = z.object({
  id: z.string(),
  sizes: z.array(
    z.object({
      startFromId: z.number(),
      width: z.number()
    })
  ),
  title: z.string(),
  color: z.string(),
  image: z.string().optional(),
  properties: z.array(schedulePropsItemSchema),
  weekdayIds: z.array(z.number())
})

export const programFormData = programSchema.omit({ id: true }).extend({
  id: z.string().optional()
})

export const programStateSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  image: z.string().optional(),
  color: z.string().optional(),
  schedule: z.array(scheduleSchema)
})
