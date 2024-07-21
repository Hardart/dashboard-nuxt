<script setup lang="ts">
import type { NewSchedule } from '~/store/useNewProgramStore'

defineProps<{ schedule: NewSchedule }>()
const shortDay = Object.values(dayShortForms)

const onChange = (schedule: NewSchedule, dayId: number) => {
  if (schedule.dayOfWeekIds.includes(dayId)) {
    schedule.dayOfWeekIds = schedule.dayOfWeekIds.filter((id) => id !== dayId)
  } else {
    schedule.dayOfWeekIds.push(dayId)
  }
  schedule.dayOfWeekIds.sort()
}

const isDayInclude = (schedule: NewSchedule, dayId: number) => schedule.dayOfWeekIds.includes(dayId)
</script>

<template>
  <div class="flex gap-7">
    <UCheckbox
      v-for="(day, index) in shortDay"
      :ui="{ wrapper: 'items-center', base: 'size-4', label: 'capitalize', inner: 'ms-2' }"
      :label="day"
      :modelValue="isDayInclude(schedule, index + 1)"
      @change="onChange(schedule, index + 1)"
    />
  </div>
</template>
