<script setup lang="ts">
defineProps<{ src: string; selected: boolean }>()
</script>

<template>
  <div class="relative w-full h-full ring-2 ring-zinc-700 rounded overflow-clip" :class="selected && 'ring-4 ring-zinc-200'">
    <!-- <UCheckbox :model-value="selected" class="absolute top-1 left-1" /> -->
    <img class="size-40 object-cover rounded" :src="src" @dragstart.prevent />
  </div>
</template>
