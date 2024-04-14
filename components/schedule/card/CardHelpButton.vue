<script setup lang="ts">
defineProps<{
  label: string
  color: string
}>()
</script>

<template>
  <UButton :label size="2xs" variant="outline" :color />
</template>
