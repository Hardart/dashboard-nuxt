<script setup lang="ts">
import { filesAPI } from '@/api/files-api'
import { UploadURLS } from '@/scheme/enums'
import type { Button } from '#ui/types'
import type { ImageName } from '~/types'
const fileRef = ref<{ input: HTMLInputElement }>()
const src = defineModel({ required: true })
const emit = defineEmits(['append-handler'])
const { name } = defineProps<{
  form?: object
  label?: string
  class?: string
  btn?: Button & { class?: string }
  selectBtn?: Button & { class?: string }
  name: ImageName
  showSelect?: boolean
}>()

function onFileClick() {
  fileRef.value?.input.click()
}

async function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) return

  const file = input.files[0]
  const body = new FormData()
  body.append(name, file, file.name)

  const srcData = await filesAPI.single(UploadURLS[name], body)
  src.value = 'http://localhost:3068' + srcData
  emit('append-handler', src.value)
}
</script>

<template>
  <UFormGroup :name :label :class v-bind="{ ...form, ...$attrs }">
    <slot name="preview"></slot>
    <UButton v-bind="{ ...btn, ...$attrs }" @click="onFileClick" />
    <UiImageSelect
      v-if="showSelect"
      v-model="src"
      :btn="{ label: 'Выбрать фото', block: true }"
      :container="{ class: selectBtn?.class || 'w-full' }"
    />
    <UInput ref="fileRef" type="file" class="hidden" accept=".jpg, .jpeg, .png, .webp, .avif" @change="onFileChange" />
  </UFormGroup>
</template>
