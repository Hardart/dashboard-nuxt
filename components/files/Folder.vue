<script setup lang="ts">
defineProps<{ src: string; path: string }>()
</script>

<template>
  <div
    class="relative flex flex-col h-full items-center justify-center select-none py-4 text-zinc-300 hover:bg-neutral-200 dark:hover:bg-zinc-800 cursor-pointer ring-1 ring-zinc-700 rounded"
    :class="src === path && 'ring-2 ring-zinc-500'"
  >
    <UIcon name="i-heroicons-folder" class="size-20" />
    <p>{{ src.replace(/.+\//, '') }}</p>
  </div>
</template>

<style></style>
