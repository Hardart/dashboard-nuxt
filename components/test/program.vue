<script setup lang="ts">
defineProps<{
  ui?: {
    class?: string
    style?: string
  }
}>()
</script>

<template>
  <div v-bind="{ ...ui, ...$attrs }" class="absolute w-16 bg-zinc-500"></div>
</template>

<style></style>
