<script setup lang="ts">
defineProps<{ src: string; path: string }>()
</script>

<template>
  <div
    class="relative flex h-full cursor-pointer select-none flex-col items-center justify-center rounded py-4 text-zinc-300 ring-1 ring-zinc-700 hover:bg-neutral-200 dark:hover:bg-zinc-800"
    :class="src === path && 'ring-2 ring-zinc-500'"
  >
    <UIcon name="i-heroicons-folder" class="size-20" />
    <p>{{ src.replace(/.+\//, '') }}</p>
  </div>
</template>

<style></style>
