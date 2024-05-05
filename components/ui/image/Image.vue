<script setup lang="ts">
import { correctImageSrc } from '@/utils/helpers'
const src = defineModel<string | undefined>({ required: true })
</script>
<template>
  <div class="group relative aspect-photo size-32 overflow-clip rounded-lg">
    <img v-if="src" class="absolute aspect-photo h-full w-full object-cover" :src="correctImageSrc(src)" alt="" />
    <div v-else class="absolute inset-0 grid place-items-center bg-zinc-700">
      <UIcon name="i-heroicons-photo" class="size-10" />
    </div>
    <div class="absolute bottom-2 hidden w-full justify-around px-3 group-hover:flex">
      <UiImageInput v-model="src" />

      <UiImageSelect v-model="src" />
    </div>
  </div>
</template>
