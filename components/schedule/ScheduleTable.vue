<script setup lang="ts">
import type { Program, ProgramSchedule } from '~/scheme/z_program'
import { weekdayIds } from '@/utils/schedule'

defineProps<{
  programs: Program[]
}>()
</script>

<template>
  <div class="flex max-h-max select-none flex-col overflow-y-auto border-4 border-zinc-700">
    <ScheduleTableHeader />
    <!-- BODY -->
    <div class="h-m relative flex w-full overflow-y-auto">
      <ScheduleTableTime />
      <ScheduleTableDay v-for="day in weekdayIds" :day />
      <ScheduleTableCardList :programs />
    </div>
  </div>
</template>
