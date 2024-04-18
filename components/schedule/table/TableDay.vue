<script setup lang="ts">
const hours = createArrayOfNumbers(24)
defineProps<{ day: number }>()
</script>
<template>
  <div class="flex-grow first:border-t-0">
    <TestTableCell v-for="hour in hours" :index="hour" :dayIndex="day" />
  </div>
</template>
