<script setup lang="ts">
defineProps<{
  label: string
  color: string
}>()
defineEmits(['on-click'])
</script>

<template>
  <UButton :label size="2xs" variant="outline" :color @click="$emit('on-click')" />
</template>
