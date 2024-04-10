<script setup lang="ts">
defineProps<{
  day: number
  hours: number[]
}>()
</script>
<template>
  <div class="flex-grow first:border-t-0">
    <TestTableCell v-for="hour in hours" :index="hour" :dayIndex="day" ref="cells" />
  </div>
</template>
