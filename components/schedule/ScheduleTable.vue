<script setup lang="ts">
import type { Program, ProgramSchedule, ProgramForTable } from '~/scheme/z_program'
import { weekdayIds, weekday } from '@/utils/schedule'
const { isNearDay } = useSchedule()
const isOpen = defineModel<boolean>({ required: true })
const props = defineProps<{
  programs: Program[]
}>()

const hours = new Array(24).fill('').map((h, index) => index)

const mappedPrograms = (program: Program) => {
  const { color, title, id } = program
  const mappedSchedule = (schedule: ProgramSchedule) => {
    const ids = isNearDay(schedule.weekdayIds)
    const props = schedule.properties
    return { ...ids, id, title, color, props }
  }
  return program.schedule.flatMap(mappedSchedule)
}

const programsForTable: ProgramForTable[] = props.programs.flatMap(mappedPrograms)
</script>

<template>
  <div class="m-2 flex w-max select-none flex-col overflow-y-auto border-4 border-zinc-700">
    <!-- HEADER -->
    <div class="z-30 flex h-8 border-b-2 border-zinc-700 bg-zinc-600">
      <div
        v-for="i in 8"
        class="grid flex-grow place-items-center capitalize first:w-20 first:flex-grow-0 first:opacity-0"
      >
        {{ weekday(i - 1).short }}
      </div>
    </div>
    <!-- BODY -->
    <div class="relative z-0 flex h-full w-full overflow-y-auto">
      <ScheduleTableTime :hours="hours" />
      <ScheduleTableDay v-for="day in weekdayIds" :day="day" :hours="hours" />
      <ScheduleTableCardList :programsForTable />
    </div>
  </div>
</template>
