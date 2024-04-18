<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import { trackAPI } from '~/api/track-api'

const { track, loading } = useTracksStore().storeRefs()
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

async function onLoadMeta() {
  const toast = useToast()
  const trackData = toValue(track)
  if (!trackData) return console.warn('No track data')
  loading.value = true
  const { artistName, trackTitle } = trackData

  const res = await trackAPI.getITunesMetadata(`${trackData.artistName} - ${trackData.trackTitle}`)
  loading.value = false
  if (res === null)
    return toast.add({
      timeout: 4000,
      title: 'Пусто',
      description: `Трека "${artistName} - ${trackTitle}" в базе iTunes не нашлось, попробуй изменить Имя артиста или Название трека`,
      icon: 'heroicons:shield-exclamation-solid',
      color: 'red'
    })
  toast.add({
    timeout: 2000,
    title: 'Мета данные трека загружены',
    icon: 'heroicons:bolt-20-solid',
    color: 'primary'
  })
  const { artworkUrl60 } = res
  trackData.cover = artworkUrl60
}
</script>

<template>
  <UForm :state="track" class="space-y-4" @submit="onSubmit">
    <div class="mb-10 flex items-center gap-5 max-md:flex-col md:items-end">
      <UAvatar :src="track?.cover" size="xl" />
      <UFormGroup label="Имя артиста" class="w-full md:w-1/2" required name="title">
        <UInput v-model="track!.artistName" autofocus />
      </UFormGroup>
      <UFormGroup label="Название трека" class="w-full md:w-1/2" required name="title">
        <UInput v-model="track!.trackTitle" />
      </UFormGroup>
    </div>

    <div class="flex justify-end gap-3">
      <UButton label="Подгрузить метаданные" class="mr-auto" @click="onLoadMeta" :loading />
      <UButton label="Отменить" color="gray" variant="ghost" @click="emit('close')" />
      <UButton type="submit" label="Сохранить" color="black" />
    </div>
  </UForm>
  <pre class="whitespace-pre-wrap">{{ track }}</pre>
</template>
