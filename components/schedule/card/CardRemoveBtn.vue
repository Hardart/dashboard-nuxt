<script setup lang="ts">
defineProps<{
  showIf?: boolean
}>()
</script>
<template>
  <UButton v-if="showIf" class="bg-gray-900" icon="heroicons:minus" variant="outline" size="2xs" />
</template>
