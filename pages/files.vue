<script setup lang="ts">
import { filesAPI } from '@/api/files-api'
const { getFiles, files, goBack, isBasePath, imageUrl, selected, folder, isImage, setSource, onImage, onFolder } = useFilesystem()
getFiles()
const removeFile = async () => {
  const fileData = await filesAPI.deleteSingle('delete_image', { path: imageUrl.value.preview })
  if (!fileData) return
  files.value = files.value?.filter((item) => item !== imageUrl.value.preview)
  selected.value = NaN
  imageUrl.value.original = ''
  imageUrl.value.preview = ''
}
const removeFolder = async () => {
  const fileData = await filesAPI.deleteSingle('delete_folder', { path: folder.value.path })
  if (!fileData) return
  files.value = files.value?.filter((item) => item !== folder.value.path)
  folder.value.path = ''
  folder.value.index = NaN
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Файлы" />

      <UDashboardPanelContent>
        <div class="flex h-full divide-zinc-700 max-2xl:flex-col 2xl:divide-x">
          <div class="flex-1">
            <div class="flex flex-wrap gap-3">
              <FilesBack v-if="!isBasePath" @click="goBack" />
              <div v-for="(src, i) in files" class="size-40 rounded">
                <FilesImage v-if="isImage(src)" @click="onImage(src, i)" :src :selected="selected == i" />
                <FilesFolder v-else :src @dblclick="setSource(src)" @click="onFolder(src)" :path="folder.path" />
              </div>
            </div>
          </div>
          <div class="w-[450px] pl-3 max-2xl:mx-auto max-2xl:flex max-2xl:flex-col">
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
~/api/files-api
