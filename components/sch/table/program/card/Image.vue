<script setup lang="ts">
defineEmits(['on-enter', 'on-leave'])
defineProps<{
  isOpen: boolean
  imageUrl?: string
  title: string
}>()
</script>

<template>
  <div class="grid place-items-center" @mouseenter.stop="$emit('on-enter')" @mouseleave="$emit('on-leave')">
    <UAvatar :class="isOpen && 'outline outline-2'" :src="correctImageSrc(imageUrl)" :alt="title" size="xs" />
  </div>
</template>
