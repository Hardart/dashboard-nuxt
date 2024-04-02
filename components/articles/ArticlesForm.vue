<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { articleFormDataSchema, type ArticleFormData } from '@/scheme/z_article'
import type { Category } from '~/scheme/z_category'
const articleFormData = defineModel<ArticleFormData>({ required: true })
const tags = defineModel<string[]>('tags', { required: true })
const categories = defineModel<Category[]>('categories', { required: true })
const { submitHandle } = defineProps<{ submitHandle: (data: ArticleFormData) => Promise<void>; loading?: boolean }>()
const { errors, validate } = useFormValidation()
async function onSubmit(event: FormSubmitEvent<any>) {
  await submitHandle(event.data)
}
</script>

<template>
  <div class="flex">
    <UForm
      :validate="validate(articleFormDataSchema)"
      :state="articleFormData"
      :validate-on="['submit']"
      class="space-y-4 w-2/3 p-4"
      @submit="onSubmit"
    >
      <div class="flex gap-x-6" :class="errors.length ? '-mb-9' : '-mb-14'">
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
          <ArticlesFormImageUpload v-model="articleFormData" />
        </div>
      </div>

      <EditorMain v-model="articleFormData.content" />

      <div class="flex justify-end gap-3">
        <UButton type="button" label="Назад" color="gray" variant="ghost" @click="navigateTo('/articles')" />
        <UButton type="submit" label="Сохранить" color="primary" :loading="loading" />
      </div>
    </UForm>
    <pre class="whitespace-pre-wrap w-1/3 p-10 text-xs">{{ articleFormData }}</pre>
  </div>
</template>
