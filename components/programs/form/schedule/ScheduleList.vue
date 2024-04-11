<script setup lang="ts">
import type { ProgramFormData, Weekday } from '~/scheme/z_program'
const { weekdays } = defineProps<{
  weekdays: Weekday[]
  programState: ProgramFormData
}>()

function getScheduleDays(array: number[]): string {
  if (array.length == 7) return 'Каждый день'
  if (array.length == 5 && array[0] === 1 && array[4] === 5) return 'По будням'
  if (array.length == 2 && array.includes(6 && 7)) return 'По выходным'
  return array.map((n) => weekdays.find((day) => day.id === n)?.title.full || '').join(', ')
}
</script>

<template>
  <ul>
    <li
      class="group my-4 flex h-12 items-center justify-between rounded-xl border-2 border-zinc-600 px-4 py-2"
      v-for="(schedule, index) in programState.schedule"
    >
      <div class="flex gap-5">
        <p>{{ schedule.weekdayIds.length == 1 ? 'День' : 'Дни' }} выхода: {{ getScheduleDays(schedule.weekdayIds) }}</p>
        <template v-for="time in schedule.properties">
          <p>Начало в: {{ time.start.hh }}:{{ time.start.mm }}</p>
          <p>Конец в: {{ time.end.hh }}:{{ time.end.mm }}</p>
        </template>
      </div>
    </li>
  </ul>
</template>

<style></style>
