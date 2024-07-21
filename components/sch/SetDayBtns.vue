<script setup lang="ts">
const dayOfWeekIds = Array.from({ length: 7 }, (_, i) => i + 1)
const ids = defineModel({ required: true })
const props = [
  { label: 'Каждый день', color: 'sky', setIds: () => dayOfWeekIds },
  { label: 'По будням', color: 'sky', setIds: () => dayOfWeekIds.slice(0, 5) },
  { label: 'По выходным', color: 'sky', setIds: () => dayOfWeekIds.slice(-2) },
  { label: 'По четным', color: 'sky', setIds: () => dayOfWeekIds.filter((day) => day % 2 == 0) },
  { label: 'По нечетным', color: 'sky', setIds: () => dayOfWeekIds.filter((day) => day % 2 !== 0) },
  { label: 'Сбросить', color: 'orange', setIds: () => [1] }
]
</script>

<template>
  <div buttons class="flex gap-2">
    <UButton size="2xs" variant="outline" v-for="{ label, color, setIds } in props" :label :color @click="ids = setIds()" />
  </div>
</template>
