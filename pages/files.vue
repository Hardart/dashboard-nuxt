<script setup lang="ts">
import { uploadsAPI } from '@/api/uploads-api'
const { getFiles, files, goBack, isBasePath, imageUrl, selected, folder, isImage, setSource, onImage, onFolder, correctSrc } =
  useFilesystem()
getFiles()
const removeFile = async () => {
  try {
    const data = await $fetch('/uploads/image-delete', { method: 'POST', body: { path: imageUrl.value.preview } })
    console.log(data)
    files.value = files.value?.filter(item => item !== imageUrl.value.preview)
    selected.value = NaN
    imageUrl.value.original = ''
    imageUrl.value.preview = ''
  } catch (error) {
    console.log(error)
  }
}
const removeFolder = async () => {
  const { data } = await uploadsAPI.deleteFolder('delete_folder', { path: folder.value.path })
  if (!data.value || !data.value.status) return
  files.value = files.value?.filter(item => item !== folder.value.path)
  folder.value.path = ''
  folder.value.index = NaN
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Файлы" />

      <UDashboardPanelContent>
        <div class="flex max-2xl:flex-col h-full 2xl:divide-x divide-zinc-700">
          <div class="flex-1">
            <div class="flex flex-wrap gap-3">
              <FilesBack v-if="!isBasePath" @click="goBack" />
              <div v-for="(src, i) in files" class="size-40 rounded">
                <FilesImage v-if="isImage(src)" @click="onImage(src, i)" :src="correctSrc(src)" :selected="selected == i" />
                <FilesFolder v-else :src @dblclick="setSource(src)" @click="onFolder(src)" :path="folder.path" />
              </div>
            </div>
          </div>
          <div class="pl-3 w-[450px] max-2xl:flex max-2xl:flex-col max-2xl:mx-auto">
            <div v-if="imageUrl.original">
              <img :src="imageUrl.original" class="" alt="" />
              <p class="text-wrap break-words">{{ imageUrl }}</p>
              <UButton label="удалить" icon="i-heroicons-trash" variant="outline" color="red" @click="removeFile" />
            </div>
            <div v-if="folder.path">
              <p class="text-wrap break-words">{{ folder.path }}</p>
              <UButton label="удалить" icon="i-heroicons-trash" variant="outline" color="red" @click="removeFolder" />
            </div>
          </div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style></style>
