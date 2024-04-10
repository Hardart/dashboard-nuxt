<script setup lang="ts">
const selectedSchedule = defineModel({ required: true })
const programSchedule = [
  { value: 'everyday', label: 'Каждый день' },
  { value: 'workdays', label: 'По будням' },
  { value: 'weekend', label: 'По выходным' },
  { value: 'custom', label: 'Выбрать день' }
]
</script>

<template>
  <div class="space-y-1">
    <URadio
      class="flex"
      v-for="method of programSchedule"
      :key="method.value"
      v-model="selectedSchedule"
      v-bind="method"
      legend="Дни выхода программы"
    />
  </div>
</template>

<style></style>
