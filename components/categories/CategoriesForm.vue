<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import { type CategoryFormData, categoryFormDataSchema, type Category } from '~/scheme/z_category'
const state = defineModel<CategoryFormData>({ required: true })
defineProps<{ onSubmit: (event: FormSubmitEvent<any>) => Promise<void> }>()
const validate = (state: CategoryFormData): FormError[] => {
  const errors = [] as FormError[]
  try {
    categoryFormDataSchema.parse(state)
  } catch (error) {
    const parsedErrors = (JSON.parse(error as string) as any[]).map(item => ({ path: item.path[0], message: item.message }))
    console.log(parsedErrors)
    errors.push(...parsedErrors)
  }

  return errors
}
</script>

<template>
  <div class="grid grid-cols-12 gap-x-5">
    <UForm :validate="validate" :state="state" :validate-on="['submit']" class="col-span-8 space-y-4" @submit="onSubmit">
      <FormText label="Заголовок" form-name="title" v-model="state.title" />
      <FormSlug v-model="state.slug" :input="state.title" />

      <div class="flex justify-end gap-3">
        <FormSwitch label="Опубликовано" form-name="isPublished" class="flex items-center gap-x-5 flex-grow" v-model="state.isPublished" />
        <UButton label="Назад" color="gray" variant="ghost" @click="navigateTo('/categories')" />
        <UButton type="submit" label="Сохранить" color="black" />
      </div>
    </UForm>
    <pre class="whitespace-pre-wrap col-span-4 text-xs">{{ state }}</pre>
  </div>
</template>
