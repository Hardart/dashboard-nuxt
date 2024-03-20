<script setup lang="ts">
defineProps<{ src: string }>()
</script>

<template>
  <div
    class="flex flex-col h-full items-center justify-center py-4 text-zinc-300 hover:bg-neutral-200 dark:hover:bg-zinc-800 cursor-pointer"
  >
    <UIcon name="i-heroicons-folder" class="size-20" />
    <p>{{ src.replace(/.+\//, '') }}</p>
  </div>
</template>

<style></style>
