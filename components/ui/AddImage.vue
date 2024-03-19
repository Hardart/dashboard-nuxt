<script setup lang="ts">
const fileRef = ref<{ input: HTMLInputElement }>()
const src = defineModel({ required: true })
const emit = defineEmits(['append-handler'])
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
    const avatarURL = await $fetch<string>('/uploads/image/news', { body, method: 'POST' })
    src.value = 'http://localhost:3068' + avatarURL
    emit('append-handler')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <UFormGroup name="news" :ui="{ container: 'flex flex-col flex-wrap items-center gap-3', help: 'mt-0' }">
    <UButton
      square
      variant="outline"
      icon="i-material-symbols-add-photo-alternate-outline-rounded"
      color="gray"
      class="editor__button"
      @click="onFileClick"
    />
    <UInput ref="fileRef" type="file" class="hidden" accept=".jpg, .jpeg, .png, .webp, .avif" @change="onFileChange" />
  </UFormGroup>
</template>

<style></style>
