<script setup lang="ts">
import type { ProgramSchedulePropsItem } from '~/scheme/z_program'

defineProps<{
  selectedWeekdayIds: number[]
  scheduleInfoState: Record<string, ProgramSchedulePropsItem[]>
  isTimeEqual: boolean
}>()
defineEmits(['addInfo', 'removeInfo'])
</script>
<template>
  <div class="border-primary relative rounded-lg border-2 p-5">
    <ScheduleCardWeekdayLabel :ids="selectedWeekdayIds" />
    <ul>
      <ScheduleCardTime v-for="info in scheduleInfoState[0]" :info :isTimeEqual />
    </ul>
    <div class="absolute -bottom-4 space-x-6">
      <ScheduleCardAddBtn @click="$emit('addInfo')" />
      <ScheduleCardRemoveBtn @click="$emit('removeInfo')" :show-if="scheduleInfoState[0].length > 1" />
    </div>
  </div>
</template>
