<script setup lang="ts">
defineProps<{ src: string; selected: boolean }>()
</script>

<template>
  <div class="relative w-full h-full">
    <UCheckbox :model-value="selected" class="absolute top-1 left-1" />
    <img class="size-40 object-cover" :src="src" @dragstart.prevent />
  </div>
</template>
