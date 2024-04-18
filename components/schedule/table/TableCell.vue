<script setup lang="ts">
defineProps<{
  dayIndex: number
  index: number
}>()
</script>

<template>
  <div
    class="group relative h-[30px] w-[120px] border-l border-zinc-600/30 bg-zinc-800"
    :class="[dayIndex == 7 && 'border-r', index && 'border-t']"
  ></div>
</template>
