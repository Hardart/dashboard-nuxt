<script setup lang="ts">
defineProps<{
  isOpen: boolean
  style: {
    LEFT: number
    TOP: number
    WIDTH: number
    HEIGHT?: number
  }
}>()
</script>
<template>
  <UCard
    v-if="isOpen"
    class="absolute -right-2 z-10 bg-neutral-100 text-xs dark:bg-blend-multiply"
    :class="[style.TOP < 90 ? 'top-[150%]' : 'bottom-[100%]']"
    :ui="{ body: { padding: '!px-2 !py-0.5' } }"
  >
    <p>повтор</p>
  </UCard>
</template>
