<script setup lang="ts">
const cell = ref()
defineProps<{
  dayIndex: number
  index: number
}>()
const { width, height, top, left } = useElementBounding(cell)
defineExpose({
  el: cell,
  top,
  left,
  width,
  height
})
</script>

<template>
  <div
    class="group relative h-[30px] w-[120px] border-l border-zinc-600/30 bg-zinc-800"
    :class="[dayIndex == 7 && 'border-r', index && 'border-t']"
    ref="cell"
  >
    <!-- <UButton class="absolute hidden group-hover:flex" size="sm" icon="i-heroicons-plus-circle-solid"/> -->
  </div>
</template>

<style></style>
