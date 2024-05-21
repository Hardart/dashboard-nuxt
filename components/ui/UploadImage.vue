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

async function onFileChange(files: FileList) {
  if (!files.length) return
  const file = files[0]
  const body = new FormData()
  body.append(name, file, file.name)
  src.value = await filesAPI.single(UploadURLS[name], body)
  emit('append-handler', src.value)
}
</script>

<template>
  <UFormGroup :name :label :class v-bind="{ ...form, ...$attrs }">
    <slot name="preview"></slot>
    <UButton v-bind="{ ...btn, ...$attrs }" @click="onFileClick" />
    <UiImageSelectOld
      v-if="showSelect"
      :name
      v-model="src"
      :btn="{ label: 'Выбрать фото', block: true, size: '2xs', color: 'gray' }"
      :container="{ class: selectBtn?.class || 'w-full' }"
    />
    <UInput ref="fileRef" type="file" class="hidden" accept=".jpg, .jpeg, .png, .webp, .avif" @change="onFileChange" />
  </UFormGroup>
</template>
