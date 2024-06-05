<script setup lang="ts">
import { correctImageSrc } from '@/utils/helpers'
import type { ImageName } from '~/types'
const src = defineModel<string | undefined>({ required: true })
defineProps<{
  name: ImageName
  ui?: {
    class: string
  }
}>()
</script>
<template>
  <div class="group relative aspect-photo size-32 overflow-clip rounded-lg" v-bind="{ ...ui }">
    <img v-if="src" class="absolute aspect-photo h-full w-full object-cover" :src alt="" />
    <div v-else class="absolute inset-0 grid place-items-center bg-zinc-700">
      <UIcon name="i-heroicons-photo" class="size-10" />
    </div>
    <div class="absolute bottom-2 hidden w-full justify-center px-3 group-hover:flex">
      <div class="flex max-w-32 flex-1 justify-center gap-2">
        <UiImageInput v-model="src" :name />
        <UiImageSelect v-model="src" :name />
      </div>
    </div>
  </div>
</template>
