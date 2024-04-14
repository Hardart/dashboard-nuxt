<script setup lang="ts">
const { selectedIdsToWeekday } = useSchedule()
defineProps<{
  ids: number[]
}>()
</script>
<template>
  <div class="absolute -top-3.5 bg-gray-900 px-1">
    {{ selectedIdsToWeekday(ids) }}
  </div>
</template>
