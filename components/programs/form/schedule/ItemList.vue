<script setup lang="ts">
import type { ProgramSchedule, Weekday } from '~/scheme/z_program'
// const selectedDaysSchedule = defineModel<ProgramSchedule[]>({ required: true })
defineProps<{
  selectedDaysSchedule: ProgramSchedule[]
  isSameTime: boolean
  isCustomMode: boolean
  weekdays: Weekday[]
  selectedDays: number[]
  dayIds: number[]
}>()
</script>

<template>
  <div class="flex justify-around p-4 ring-1 rounded-lg relative" v-for="(schedule, index) in selectedDaysSchedule">
    <p class="absolute left-5 -top-1.5 bg-white dark:bg-gray-900 px-1 text-sm leading-3" v-if="isSameTime">Единое время</p>
    <p class="absolute left-5 -top-1.5 bg-white dark:bg-gray-900 px-1 text-sm leading-3 capitalize" v-else-if="isCustomMode">
      {{ weekdays[selectedDays[index] - 1]?.title.full }}
    </p>
    <p class="absolute left-5 -top-1.5 bg-white dark:bg-gray-900 px-1 text-sm leading-3 capitalize" v-else>
      {{ weekdays[dayIds[index] - 1].title.full }}
    </p>
    <ProgramsFormScheduleTime :schedule="schedule" />
    <div class="flex gap-2 items-center">
      <UFormGroup label="Повтор" :ui="{ wrapper: 'flex items-center gap-2' }">
        <UToggle v-model="schedule.isReplay" class="mt-0.5" />
      </UFormGroup>
    </div>
  </div>
</template>
