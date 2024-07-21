<script setup lang="ts">
defineEmits(['on-enter', 'on-leave'])
defineProps<{ isRepeat: boolean }>()
</script>
<template>
  <div
    class="absolute right-1 top-1 grid size-2 place-items-center rounded-full bg-zinc-800/60 text-xs font-bold ring-1 ring-white"
    v-if="isRepeat"
    @mouseenter="$emit('on-enter')"
    @mouseleave="$emit('on-leave')"
  />
</template>
