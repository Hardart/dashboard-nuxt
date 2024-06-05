<script setup lang="ts">
import { type ArticleFormData } from '@/scheme/z_article'
const articleFormData = defineModel<ArticleFormData>({ required: true })
</script>

<template>
  <UiUploadImage
    v-model="articleFormData.image"
    :form="{ label: 'Главное изображение' }"
    :btn="{ label: 'Загрузить фото', block: true, color: 'gray', size: '2xs' }"
    name="news"
    :ui="{ container: 'flex flex-col flex-wrap items-center gap-1' }"
    showSelect
  >
    <template #preview>
      <UAvatar
        icon="i-heroicons-photo"
        size="3xl"
        :src="articleFormData.image"
        imgClass="object-cover object-top w-full h-full"
        class="mb-2 h-52 w-[347px] bg-white"
        :ui="{ rounded: 'rounded-lg' }"
      />
    </template>
  </UiUploadImage>
</template>

<style></style>
