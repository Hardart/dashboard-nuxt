<script setup lang="ts">
defineProps<{
  isOpen: boolean
  title: string
  imageUrl?: string
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
    class="absolute z-10 whitespace-nowrap group-hover:block"
    :class="[
      style.LEFT == 64 && '-left-2',
      style.LEFT > 600 && 'right-2',
      style.WIDTH <= 120 && style.LEFT < 64 && '-left-28',
      style.TOP < 90 ? 'top-12' : '-top-6'
    ]"
    :ui="{
      body: { padding: 'p-3 sm:px-4 sm:py-3' },
      header: { padding: 'p-3 sm:px-4 sm:py-3' }
    }"
  >
    <h3 class="text-sm font-semibold">{{ title }}</h3>
  </UCard>
</template>
