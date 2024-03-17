<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const { track } = storeToRefs(useTracksStore())

const emit = defineEmits(['close'])

// https://ui.nuxt.com/components/form
const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.title) errors.push({ path: 'title', message: 'Please enter a name.' })
  if (!state.slug) errors.push({ path: 'slug', message: 'Please enter an slug.' })
  if (!state.category.id || state.category.id.trim() === '')
    errors.push({ path: 'category', message: 'Please select at least one category.' })

  if (state.content.length < 10) errors.push({ path: 'content', message: 'Please add content, at least 10 charachters' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  // articleSchema.parse(articleFormData)
  console.log(event.data)
  emit('close')
}
</script>

<template>
  <UForm :state="track" class="space-y-4" @submit="onSubmit">
    <div class="flex items-center max-md:flex-col md:items-end gap-5 mb-10">
      <UAvatar :src="track?.cover" size="xl" />
      <UFormGroup label="Имя артиста" class="w-full md:w-1/2" required name="title">
        <UInput v-model="track!.artistName" autofocus />
      </UFormGroup>
      <UFormGroup label="Название трека" class="w-full md:w-1/2" required name="title">
        <UInput v-model="track!.trackTitle" />
      </UFormGroup>
    </div>

    <div class="flex justify-end gap-3">
      <UButton label="Отменить" color="gray" variant="ghost" @click="emit('close')" />
      <UButton type="submit" label="Сохранить" color="black" />
    </div>
  </UForm>
  <pre class="whitespace-pre-wrap">{{ track }}</pre>
</template>
