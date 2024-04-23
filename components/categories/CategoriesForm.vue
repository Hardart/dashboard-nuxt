<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { type CategoryFormData, categoryFormDataSchema } from '~/scheme/z_category'
const state = defineModel<CategoryFormData>({ required: true })
defineProps<{ onSubmit: (event: FormSubmitEvent<any>) => Promise<void> }>()
const { validate } = useFormValidation()
</script>

<template>
  <div class="grid grid-cols-12 gap-x-5">
    <UForm
      :validate="validate(categoryFormDataSchema)"
      :state="state"
      :validate-on="['submit']"
      class="col-span-8 space-y-4"
      @submit="onSubmit"
    >
      <FormText label="Заголовок" name="title" v-model="state.title" />
      <FormSlug v-model="state.slug" :input="state.title" />
      <!-- <USelectMenu v-model="tags" creatable multiple searchable :options="options" searchablePlaceholder="Поиск..." /> -->
      <div class="flex justify-end gap-3">
        <FormSwitch
          label="Опубликовано"
          name="isPublished"
          class="flex flex-grow items-center gap-x-5"
          v-model="state.isPublished"
        />
        <UButton label="Назад" color="gray" variant="ghost" @click="navigateTo('/categories')" />
        <UButton type="submit" label="Сохранить" color="black" />
      </div>
    </UForm>
    <pre class="col-span-4 whitespace-pre-wrap text-xs">{{ state }}</pre>
  </div>
</template>
