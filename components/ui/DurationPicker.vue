<script setup lang="ts">
const duration = defineModel<string>({ required: true })

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'))
const selectedHour = ref(duration.value.split(':')[0])
const selectedMinute = ref(duration.value.split(':')[1])

watch([selectedHour, selectedMinute], () => {
  duration.value = `${selectedHour.value}:${selectedMinute.value}`
})
</script>

<template>
  <div class="flex items-center gap-2 text-xs">
    <p>Длительность</p>
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
