<script setup lang="ts">
import type { ImageName } from '~/types'

const src = defineModel({ required: true })
defineProps<{
  name: ImageName
}>()
</script>

<template>
  <UiUploadImage
    v-model="src"
    :form="{ label: 'Главное изображение' }"
    :btn="{ label: 'Загрузить фото', block: true, color: 'gray' }"
    :name
    :ui="{ container: 'flex flex-col flex-wrap items-center gap-3 mb-2', help: 'mt-0' }"
    showSelect
  >
    <template #preview>
      <UAvatar
        :src
        icon="i-heroicons-photo"
        size="3xl"
        imgClass="object-cover object-top w-full h-full"
        class="w-[347px] h-52 bg-white"
        :ui="{ rounded: 'rounded-lg' }"
      />
    </template>
  </UiUploadImage>
</template>

<style></style>
