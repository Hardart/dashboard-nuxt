<script setup lang="ts">
const selectedWeekdayIds = defineModel<number[]>({ required: true })
const onChange = (weekdayId: number) => {
  if (selectedWeekdayIds.value.includes(weekdayId)) {
    selectedWeekdayIds.value = selectedWeekdayIds.value.filter((id) => id !== weekdayId)
  } else selectedWeekdayIds.value.push(weekdayId)
  selectedWeekdayIds.value.sort()
}
</script>

<template>
  <div class="flex gap-8">
    <UCheckbox
      v-for="day in weekdayIds"
      :ui="{ base: 'w-5 h-5', label: 'text-sm capitalize' }"
      :label="weekday(day).short"
      :modelValue="selectedWeekdayIds.includes(day)"
      @change="onChange(day)"
    />
  </div>
</template>
