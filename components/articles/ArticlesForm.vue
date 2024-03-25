<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import { articleFormDataSchema, type ArticleFormData } from '@/scheme/z_article'
import { UploadURLS } from '~/scheme/enums'
import type { Category } from '~/scheme/z_category'
const articleFormData = defineModel<ArticleFormData>({ required: true })
const tags = defineModel<string[]>('tags', { required: true })
const categories = defineModel<Category[]>('categories', { required: true })
const { submitHandle } = defineProps<{ submitHandle: (data: ArticleFormData) => Promise<void>; loading?: boolean }>()

// https://ui.nuxt.com/components/form
const validate = (state: ArticleFormData): FormError[] => {
  const errors = [] as FormError[]
  try {
    articleFormDataSchema.parse(state)
  } catch (error) {
    const parsedErrors = (JSON.parse(error as string) as any[]).map(item => ({ path: item.path[0], message: item.message }))
    console.log(parsedErrors)
    errors.push(...parsedErrors)
  }

  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  await submitHandle(event.data)
}
</script>

<template>
  <div class="flex">
    <UForm :validate="validate" :state="articleFormData" :validate-on="['submit']" class="space-y-4 w-2/3 p-4" @submit="onSubmit">
      <div class="flex gap-x-6 -mb-14">
        <div class="flex flex-col space-y-7 flex-grow">
          <div class="space-y-3">
            <ArticlesFormTitle v-model="articleFormData.title" />
            <ArticlesFormSlug v-model="articleFormData.slug" :value="articleFormData.title" />
          </div>
          <div class="flex gap-x-5">
            <ArticlesFormCategories v-model="articleFormData.categoryId" :categories="categories" />
            <ArticlesFormTags v-model="articleFormData.tags" v-model:options="tags" />
            <ArticlesFormIsPublished v-model="articleFormData.isPublished" />
            <FormPublishDate v-model="articleFormData.publishAt" />
          </div>
        </div>
        <div class="space-y-2">
          <UiUploadImage
            v-model="articleFormData.image"
            :form="{ label: 'Главное изображение' }"
            :btn="{ label: 'Загрузить фото', block: true, color: 'gray' }"
            name="news"
            :ui="{ container: 'flex flex-col flex-wrap items-center gap-3', help: 'mt-0' }"
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
          <UPopover>
            <UButton square color="gray" label="Выбрать фото" block />
            <template #panel="{ close }">
              <UiFileSelect v-model="articleFormData.image" @close="close" />
            </template>
          </UPopover>
        </div>

        <!-- <UiUploadImage v-model="articleFormData.image" /> -->
      </div>

      <ArticlesFormContentEditor v-model="articleFormData.content" />

      <div class="flex justify-end gap-3">
        <UButton type="button" label="Назад" color="gray" variant="ghost" @click="navigateTo('/articles')" />
        <UButton type="submit" label="Сохранить" color="primary" :loading="loading" />
      </div>
    </UForm>
    <pre class="whitespace-pre-wrap w-1/3 p-10 text-xs">{{ articleFormData }}</pre>
  </div>
</template>
