<script setup lang="ts">
import type { ProgramFormData, Weekday } from '~/scheme/z_program'
const { weekdays } = defineProps<{
  weekdays: Weekday[]
  programState: ProgramFormData
  deleteHandle: (id: number) => void
}>()

function getScheduleDays(array: number[]): string {
  if (array.length == 7) return 'Каждый день'
  if (array.length == 5) return 'По будням'
  if (array.length == 2 && array.includes(6 && 7)) return 'По выходным'
  return array.map(n => weekdays.find(day => day.id === n)?.title.full || '').join(', ')
}
</script>

<template>
  <ul>
    <li
      class="flex items-center h-12 justify-between px-4 py-2 border-2 border-zinc-600 rounded-xl my-4 group"
      v-for="(schedule, index) in programState.schedule"
    >
      <div class="flex gap-5">
        <p>{{ schedule.dayId.length == 1 ? 'День' : 'Дни' }} выхода: {{ getScheduleDays(schedule.dayId) }}</p>
        <p>Начало в: {{ schedule.start.hh }}:{{ schedule.start.mm }}</p>
        <p>Конец в: {{ schedule.end.hh }}:{{ schedule.end.mm }}</p>
      </div>
      <UButton
        icon="i-heroicons-trash"
        size="xs"
        :ui="{ rounded: 'rounded-full' }"
        class="hidden group-hover:inline-block"
        color="red"
        variant="outline"
        @click="deleteHandle(index)"
      />
    </li>
  </ul>
</template>

<style></style>
