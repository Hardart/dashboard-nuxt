<script setup lang="ts">
import { filesAPI } from '@/api/files-api'
import { UploadURLS } from '@/scheme/enums'
import type { ImageName } from '~/types'
const fileRef = ref<{ input: HTMLInputElement }>()
const src = defineModel<string | undefined>({ required: true })
const emit = defineEmits(['append-handler'])

const { name } = defineProps<{
  name: ImageName
  formUI?: object
  label?: string
  class?: string
}>()

function onFileClick() {
  fileRef.value?.input.click()
}

async function onFileChange(files: FileList) {
  if (!files.length) return console.warn('File list is empty')
  const file = files[0]
  const body = new FormData()
  body.append(name, file, file.name)

  src.value = await filesAPI.single(UploadURLS[name], body)
  emit('append-handler', src.value)
}
</script>

<template>
  <UTooltip text="Загрузить" :openDelay="0">
    <UFormGroup :name :label :class v-bind="{ ...formUI, ...$attrs }">
      <UButton
        variant="ghost"
        icon="i-material-symbols-add-photo-alternate-outline-rounded"
        color="gray"
        class="border border-zinc-500 bg-zinc-700/40"
        @click="onFileClick"
      />
      <UInput ref="fileRef" type="file" class="hidden" accept=".jpg, .jpeg, .png, .webp, .avif" @change="onFileChange" />
    </UFormGroup>
  </UTooltip>
</template>
