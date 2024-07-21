<script setup lang="ts">
const startTime = defineModel<string>('start', { required: true })
const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'))
const selectedHour = ref(startTime.value.split(':')[0])
const selectedMinute = ref(startTime.value.split(':')[1])
watch([selectedHour, selectedMinute], () => {
  startTime.value = `${selectedHour.value}:${selectedMinute.value}`
})
</script>

<template>
  <div class="flex items-center gap-3 text-xs">
    <p>Начало в</p>
    <div class="flex items-center gap-1">
      <UiTimePickerSelect :options="hours" v-model="selectedHour" />
      <p>ч.</p>
    </div>
    <div class="flex items-center gap-1">
      <UiTimePickerSelect :options="minutes" v-model="selectedMinute" />
      <p>мин.</p>
    </div>
  </div>
</template>
