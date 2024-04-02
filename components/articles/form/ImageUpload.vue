<script setup lang="ts">
import { type ArticleFormData } from '@/scheme/z_article'
const articleFormData = defineModel<ArticleFormData>({ required: true })
</script>

<template>
  <UiUploadImage
    v-model="articleFormData.image"
    :form="{ label: 'Главное изображение' }"
    :btn="{ label: 'Загрузить фото', block: true, color: 'gray' }"
    name="news"
    :ui="{ container: 'flex flex-col flex-wrap items-center gap-3', help: 'mt-0' }"
    showSelect
  >
    <template #preview>
      <UAvatar
        icon="i-heroicons-photo"
        size="3xl"
        :src="articleFormData.image"
        imgClass="object-cover object-top w-full h-full"
        class="w-[347px] h-52 bg-white"
        :ui="{ rounded: 'rounded-lg' }"
      />
    </template>
  </UiUploadImage>
</template>

<style></style>
