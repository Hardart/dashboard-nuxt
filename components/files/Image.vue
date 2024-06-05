<script setup lang="ts">
defineProps<{ src: string; selected: boolean }>()
</script>

<template>
  <div class="relative h-full w-full overflow-clip rounded ring-2 ring-zinc-700" :class="selected && 'ring-4 ring-zinc-200'">
    <!-- <UCheckbox :model-value="selected" class="absolute top-1 left-1" /> -->
    <img class="size-40 rounded object-cover" :src="src" @dragstart.prevent />
  </div>
</template>
