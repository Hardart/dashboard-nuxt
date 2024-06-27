<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import { trackAPI } from '~/api/track-api'
import type { Track } from '~/scheme/z_track'
import type { ITunesTrack } from '~/types/itunes'

const { track, loading, tracks } = useTracksStore().storeRefs()
const emit = defineEmits(['close'])
const iTunesTracks = ref<ITunesTrack[]>([])
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
const trackForm = ref<Track>({ ...track.value! })

const columns = [
  {
    key: 'artworkUrl60',
    label: '',
    class: 'min-w-20 !p-0'
  },
  {
    key: 'artistName',
    label: 'Артист'
  },
  {
    key: 'trackName',
    label: 'Название трека'
  }
]

async function onSubmit(event: FormSubmitEvent<any>) {
  const toast = useToast()
  // Do something with data
  // articleSchema.parse(articleFormData)
  toast.add({
    timeout: 10000,
    title: 'Все хорошо, но данные пока не сохраняются в базе, сорямба)))',
    icon: 'heroicons:hand-thumb-up-16-solid',
    color: 'primary'
  })
  emit('close')
}
async function onCancel() {
  const idx = tracks.value.findIndex((t) => t.id === track.value?.id)
  tracks.value.splice(idx, 1, track.value!)
  emit('close')
}

async function onLoadMeta() {
  const toast = useToast()
  const trackData = toValue(trackForm)
  if (!trackData) return console.warn('No track data')
  loading.value = true
  const { artistName, trackTitle } = trackData

  const res = await trackAPI.getITunesMetadata(`${trackData.artistName} - ${trackData.trackTitle}`)
  loading.value = false
  if (res === null) {
    return toast.add({
      timeout: 5000,
      title: 'Пусто',
      description: `Трека "${artistName} - ${trackTitle}" в базе iTunes не нашлось, попробуй изменить Имя артиста или Название трека`,
      icon: 'heroicons:shield-exclamation-solid',
      color: 'red'
    })
  } else {
    toast.add({
      timeout: 2000,
      title: 'Мета данные трека загружены',
      icon: 'heroicons:bolt-20-solid',
      color: 'primary'
    })
    iTunesTracks.value = res
  }
}

function select({ artistName, artworkUrl60, trackName, previewUrl }: ITunesTrack) {
  if (trackForm.value) {
    trackForm.value = { ...trackForm.value, artistName, trackTitle: trackName, cover: artworkUrl60, preview: previewUrl }
    const idx = tracks.value.findIndex((t) => t.id === track.value?.id)
    tracks.value.splice(idx, 1, trackForm.value)
  }
}
</script>

<template>
  <UForm :state="trackForm" class="space-y-4" @submit="onSubmit">
    <div class="mb-10 flex items-center gap-5 max-md:flex-col md:items-end">
      <UAvatar :src="trackForm?.cover" size="xl" />
      <UFormGroup label="Имя артиста" class="w-full md:w-1/2" required name="title">
        <UInput v-model="trackForm.artistName" autofocus />
      </UFormGroup>
      <UFormGroup label="Название трека" class="w-full md:w-1/2" required name="title">
        <UInput v-model="trackForm.trackTitle" />
      </UFormGroup>
    </div>

    <div class="flex justify-end gap-3">
      <UButton label="Подгрузить метаданные" class="mr-auto" @click="onLoadMeta" :loading />
      <UButton label="Отменить" color="gray" variant="ghost" @click="onCancel" />
      <UButton type="submit" label="Сохранить" color="black" />
    </div>
  </UForm>
  <UTable v-if="iTunesTracks.length" :rows="iTunesTracks" :columns @select="select">
    <template #artworkUrl60-data="{ row }">
      <img :src="row.artworkUrl60" height="60" width="60" alt="" />
    </template>
  </UTable>
</template>
