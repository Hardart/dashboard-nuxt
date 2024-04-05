<script setup lang='ts'>
const cell = ref()
defineProps<{
  dayIndex: number
  index: number
}>()
const {width, height, top, left} = useElementBounding(cell, )
defineExpose({
  el: cell,
  top,
  left,
  width,
  height
})
</script>
 
<template>
<div class="h-[60px] w-[120px] relative bg-zinc-800 border-l  border-zinc-500 group"  :class="[dayIndex == 6 && 'border-r', index && 'border-t']" ref="cell">
  <!-- <UButton class="absolute hidden group-hover:flex" size="sm" icon="i-heroicons-plus-circle-solid"/> -->
</div>
</template>
 
<style></style>