<script setup lang="ts">
import type { Category } from '~/scheme/z_category'
import { articleFormDataSchema, type ArticleFormData } from '@/scheme/z_article'
const articleFormData = defineModel<ArticleFormData>({ required: true })
const tags = defineModel<string[]>('tags', { required: true })
const categories = defineModel<Category[]>('categories', { required: true })
const { errors, validate } = useFormValidation()

defineEmits(['onSubmit'])
defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <div class="flex">
    <UForm
      :validate="validate(articleFormDataSchema)"
      :state="articleFormData"
      :validate-on="['submit']"
      class="w-2/3 space-y-4 p-4"
      @submit="$emit('onSubmit')"
    >
      <div class="flex gap-x-6" :class="errors.length ? '-mb-9' : '-mb-14'">
        <div class="flex flex-grow flex-col space-y-7">
          <div class="space-y-3">
            <ArticlesFormTitle v-model="articleFormData.title" />
            <ArticlesFormSlug
              v-model="articleFormData.slug"
              :value="articleFormData.title"
            />
          </div>
          <div class="flex gap-x-5">
            <ArticlesFormCategories
              v-model="articleFormData.categoryId"
              :categories="categories"
            />
            <ArticlesFormTags
              v-model="articleFormData.tags"
              v-model:options="tags"
            />
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
        <UButton
          type="button"
          label="Назад"
          color="gray"
          variant="ghost"
          @click="navigateTo('/articles')"
        />
        <UButton
          type="submit"
          label="Сохранить"
          color="primary"
          :loading="loading"
        />
      </div>
    </UForm>
    <pre class="w-1/3 whitespace-pre-wrap p-10 text-xs">
      {{ articleFormData }}
    </pre>
  </div>
</template>
