<script setup lang="ts">
import type { ImageName } from '~/types'

const src = defineModel({ required: true })
defineProps<{
  name: ImageName
  width?: string
  height?: string
}>()
</script>

<template>
  <UiUploadImage
    v-model="src"
    :form="{ label: 'Главное изображение' }"
    :btn="{ label: 'Загрузить фото', block: true, color: 'gray', size: '2xs' }"
    :name
    :ui="{ container: 'flex flex-col flex-wrap items-center gap-1' }"
    showSelect
  >
    <template #preview>
      <UAvatar
        :src
        icon="i-heroicons-photo"
        size="3xl"
        imgClass="object-cover object-top w-full h-full aspect-square"
        class="mb-1 bg-white ring-1 ring-zinc-700"
        :class="[width || 'w-[347px]', height || 'h-52']"
        :ui="{ rounded: 'rounded-lg' }"
      />
    </template>
  </UiUploadImage>
</template>

<style></style>
