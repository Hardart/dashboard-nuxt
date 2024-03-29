<script setup lang="ts">
import { filesAPI } from '@/api/files-api'
import { UploadURLS } from '@/scheme/enums'
const fileRef = ref<{ input: HTMLInputElement }>()
const src = defineModel({ required: true })
const emit = defineEmits(['append-handler'])
const { name } = defineProps<{
  form?: object
  label?: string
  class?: string
  btn?: {
    label?: string
    icon?: string
    trailingIcon?: string
    variant?: 'link' | 'solid' | 'outline' | 'soft' | 'ghost'
    square?: boolean
    color?: string
    block?: boolean
    class?: string
  }
  name: 'news' | 'avatar' | 'gallery'
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
    <div :class="[btn?.block && 'w-full', showSelect && 'flex flex-wrap gap-2']">
      <UButton v-bind="{ ...btn, ...$attrs }" @click="onFileClick" />
      <UPopover v-if="showSelect">
        <UButton color="gray" label="Выбрать фото" :block="btn?.block" />
        <template #panel="{ close }">
          <UiFileSelect v-model="src" @close="close" />
        </template>
      </UPopover>
    </div>
    <UInput ref="fileRef" type="file" class="hidden" accept=".jpg, .jpeg, .png, .webp, .avif" @change="onFileChange" />
  </UFormGroup>
</template>

<style></style>
~/api/files-api
