<script setup lang="ts">
const props = defineProps<{ startTime: string }>()
const endTime = defineModel<string>('end', { required: true })
const selectedHour = ref(endTime.value.split(':')[0])
const selectedMinute = ref(endTime.value.split(':')[1])

const hours = computed(() => {
  let arr = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')).filter((n) => n >= props.startTime.split(':')[0])
  if (props.startTime.split(':')[1] == '55') arr = arr.filter((n) => n > props.startTime.split(':')[0])
  if (!arr.includes('00')) arr.push('00')
  return arr
})
const minutes = computed(() => {
  let arr = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'))
  if (props.startTime.split(':')[0] == selectedHour.value) arr = arr.filter((n) => n > props.startTime.split(':')[1])
  return arr
})

watch([selectedHour, selectedMinute, () => props.startTime], () => {
  const [startHours, startMinutes] = props.startTime.split(':').map(Number)
  const date = new Date()
  const endMinute = parseInt(selectedMinute.value)
  date.setHours(startHours, endMinute)
  if (startHours >= parseInt(selectedHour.value) && selectedHour.value !== hours.value.slice(-1)[0]) {
    if (startMinutes >= endMinute) date.setHours(startHours, startMinutes + 5)
    selectedHour.value = String(date.getHours()).padStart(2, '0')
    selectedMinute.value = String(date.getMinutes()).padStart(2, '0')
  }
  endTime.value = `${selectedHour.value}:${selectedMinute.value}`
})
</script>

<template>
  <div class="flex gap-2">
    <p class="text-sm">Заканчивается</p>
    <UFormGroup>
      <USelectMenu :options="hours" v-model="selectedHour" />
    </UFormGroup>
    <UFormGroup>
      <USelectMenu :options="minutes" v-model="selectedMinute" />
    </UFormGroup>
  </div>
</template>
