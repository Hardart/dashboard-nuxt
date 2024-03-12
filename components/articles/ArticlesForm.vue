<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import { useArticleStore } from '~/store/useArticleStore'
const { articleFormData, tags, categories } = storeToRefs(useArticleStore())

const emit = defineEmits(['close'])

// https://ui.nuxt.com/components/form
const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.title) errors.push({ path: 'title', message: 'Please enter a name.' })
  if (!state.slug) errors.push({ path: 'slug', message: 'Please enter an slug.' })
  if (!state.categodyId) errors.push({ path: 'categoryId', message: 'Please select at least one category.' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)

  emit('close')
}
</script>

<template>
  <UForm :validate="validate" :validate-on="['submit']" :state="articleFormData" class="space-y-4" @submit="onSubmit">
    <div class="flex flex-wrap gap-5 mb-10">
      <ArticlesFormTitle v-model="articleFormData.title" />
      <ArticlesFormSlug v-model="articleFormData.slug" :value="articleFormData.title" />
      <ArticlesFormCategories v-model="articleFormData.categoryId" :categories="categories" />
      <ArticlesFormTags v-model="articleFormData.tags" :tags="tags" />
    </div>
    <UFormGroup label="Текст новости">
      <ArticlesFormContentEditor v-model="articleFormData.content" />
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton label="Отменить" color="gray" variant="ghost" @click="emit('close')" />
      <UButton type="submit" label="Сохранить" color="black" />
    </div>
  </UForm>
  <pre class="whitespace-pre-wrap">{{ articleFormData }}</pre>
</template>
