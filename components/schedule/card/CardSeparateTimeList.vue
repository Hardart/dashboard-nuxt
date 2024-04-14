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
  <div class="border-primary relative rounded-lg border-2 p-5" v-for="weekdayId in selectedWeekdayIds">
    <ScheduleCardWeekdayLabel :ids="[weekdayId]" />
    <ul>
      <ScheduleCardTime
        v-if="scheduleInfoState[weekdayId]"
        v-for="info in scheduleInfoState[weekdayId]"
        :info
        :isTimeEqual
      />
    </ul>
    <div class="absolute -bottom-4 space-x-6">
      <ScheduleCardAddBtn @click="$emit('addInfo', weekdayId)" />
      <ScheduleCardRemoveBtn
        @click="$emit('removeInfo', weekdayId)"
        :show-if="scheduleInfoState[weekdayId].length > 1"
      />
    </div>
  </div>
</template>
