<script setup lang="ts">
const { getFiles, files, prevPath, isBasePath, isImage, setSource } = useFilesystem()
getFiles()
const fileRef = ref<{ input: HTMLInputElement }>()
async function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) return

  const file = input.files[0]
  const body = new FormData()
  body.append('gallery', file, file.name)

  const avatarURL = await $fetch<string>('/uploads/image/gallery', { body, method: 'POST' })
  src.value = 'http://localhost:3068' + avatarURL
}

function onFileClick() {
  fileRef.value?.input.click()
}
const src = ref('')
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Файлы">
        <template #right>
          <UFormGroup
            name="gallery"
            label="Avatar"
            class="grid grid-cols-2 gap-2"
            help="JPG, GIF or PNG. 1MB Max."
            :ui="{ container: 'flex flex-wrap items-center gap-3', help: 'mt-0' }"
          >
            <UAvatar :src="src" imgClass="object-cover" alt="gallery" size="md" />

            <UButton label="Choose" color="white" size="md" @click="onFileClick" />

            <UInput ref="fileRef" type="file" class="hidden" accept=".jpg, .jpeg, .png, .gif" @change="onFileChange" />
          </UFormGroup>
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent>
        <div class="flex flex-wrap lg:items-center gap-4 mt-8">
          <div
            class="flex flex-col items-center size-48 justify-center py-4 hover:bg-neutral-200 dark:hover:bg-slate-800 cursor-pointer"
            v-if="!isBasePath"
            @click="setSource(prevPath)"
          >
            <UIcon name="i-heroicons-arrow-small-left" class="size-20" />
          </div>
          <div v-for="src in files" class="size-48 overflow-clip">
            <img v-if="isImage(src)" class="size-48 object-cover" :src="`http://localhost:3068${src}`" alt="" />
            <div
              v-else
              class="flex flex-col items-center py-4 hover:bg-neutral-200 dark:hover:bg-slate-800 cursor-pointer"
              @click="setSource(src)"
            >
              <UIcon name="i-heroicons-folder" class="size-32" />
              <p>{{ src.replace(/.+\//, '') }}</p>
            </div>
          </div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style></style>
