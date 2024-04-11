<script setup lang="ts">
const selectedDayIds = defineModel<number[]>({ required: true })

const onEveryday = () => (selectedDayIds.value = weekdayIds)
const onWorkday = () => (selectedDayIds.value = weekdayIds.slice(0, 5))
const onWeekend = () => (selectedDayIds.value = weekdayIds.slice(-2))
const onOddDay = () => (selectedDayIds.value = weekdayIds.filter((day) => day % 2 == 0))
const onClear = () => (selectedDayIds.value = [])

const props = [
  { label: 'Каждый день', color: 'sky', click: onEveryday },
  { label: 'По будням', color: 'sky', click: onWorkday },
  { label: 'По выходным', color: 'sky', click: onWeekend },
  { label: 'Через день', color: 'sky', click: onOddDay },
  { label: 'Сбросить', color: 'orange', click: onClear }
]
</script>

<template>
  <div buttons class="flex gap-2">
    <ProgramsCardWeekdaysBtn v-for="prop in props" :label="prop.label" :color="prop.color" @on-click="prop.click" />
  </div>
</template>
