<script setup lang="ts">
import type { Program, ProgramSchedule } from '~/scheme/z_program'
import { combineNearDays } from '@/utils/schedule'
const props = defineProps<{ programs: Program[] }>()

const mappedPrograms = (program: Program) => {
  const { color, title } = program
  const mappedSchedule = ({ properties, weekdayIds }: ProgramSchedule) => {
    const sizes = combineNearDays(weekdayIds)
    const id = program.id || `3jr2jkrhfhfviu`
    return { sizes, id, title, color, properties, weekdayIds }
  }

  return program.schedule.flatMap(mappedSchedule)
}

const scheduleListForTable = computed(() => props.programs.flatMap(mappedPrograms))
</script>

<template>
  <div v-for="schedule in scheduleListForTable">
    <template v-for="size in schedule.sizes">
      <ScheduleTableCardInfo v-for="info in schedule.properties" :size :info :schedule />
    </template>
  </div>
</template>
