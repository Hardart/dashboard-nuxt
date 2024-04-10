<script setup lang="ts">
defineProps<{
  ui?: {
    class?: string
    style?: string
  }
}>()
const elem = ref()
defineExpose({
  elem
})
</script>

<template>
  <div v-bind="{ ...ui, ...$attrs }" class="absolute w-[120px] cursor-pointer bg-zinc-500" ref="elem"></div>
</template>

<style></style>
