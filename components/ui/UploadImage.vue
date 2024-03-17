<script setup lang="ts">
const fileRef = ref<{ input: HTMLInputElement }>()
const src = defineModel({ required: true })
function onFileClick() {
  fileRef.value?.input.click()
}
async function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) return

  const file = input.files[0]
  const body = new FormData()
  body.append('news', file, file.name)

  const avatarURL = await $fetch<string>('/uploads/image/news', { body, method: 'POST' })
  src.value = 'http://localhost:3068' + avatarURL
}
</script>

<template>
  <UFormGroup name="news" label="Главная картинка" :ui="{ container: 'flex flex-col flex-wrap items-center gap-3', help: 'mt-0' }">
    <UAvatar
      icon="i-heroicons-photo"
      size="3xl"
      :src="src"
      imgClass="object-cover object-top w-full h-full"
      class="w-[347px] h-52 bg-white"
      :ui="{ rounded: 'rounded-lg' }"
    />
    <UButton label="Выбрать фото" color="white" size="md" block @click="onFileClick" />
    <UInput ref="fileRef" type="file" class="hidden" accept=".jpg, .jpeg, .png, .webp, .avif" @change="onFileChange" />
  </UFormGroup>
</template>

<style></style>
