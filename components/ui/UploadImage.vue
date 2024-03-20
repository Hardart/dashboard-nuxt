<script setup lang="ts">
const fileRef = ref<{ input: HTMLInputElement }>()
const src = defineModel({ required: true })
const emit = defineEmits(['append-handler'])
defineProps<{
  form?: object
  btn?: {
    label?: string
    icon?: string
    trailingIcon?: string
    variant?: 'link' | 'solid' | 'outline' | 'soft' | 'ghost'
    square?: boolean
    class?: string
    color?: string
    block?: boolean
  }
}>()

function onFileClick() {
  fileRef.value?.input.click()
}

async function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) return

  const file = input.files[0]
  const body = new FormData()
  body.append('news', file, file.name)

  try {
    const imageURL = await $fetch<string>('/uploads/image/news', { body, method: 'POST' })
    src.value = 'http://localhost:3068' + imageURL
    emit('append-handler', src.value)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <UFormGroup name="news" v-bind="{ ...form, ...$attrs }" :ui="{ container: 'flex flex-col flex-wrap items-center gap-3', help: 'mt-0' }">
    <slot name="preview"></slot>
    <UButton v-bind="{ ...btn, ...$attrs }" @click="onFileClick" />
    <UInput ref="fileRef" type="file" class="hidden" accept=".jpg, .jpeg, .png, .webp, .avif" @change="onFileChange" />
  </UFormGroup>
</template>

<style></style>
