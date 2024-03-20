<script setup lang="ts">
const { getFiles, files, goBack, isBasePath, imageUrl, selected, isImage, setSource, onImage, correctSrc } = useFilesystem()
getFiles()
const removeFile = async () => {
  try {
    const data = await $fetch('/uploads/image/delete', { method: 'POST', body: { path: imageUrl.value.preview } })
    console.log(data)
    files.value = files.value.filter(item => item !== imageUrl.value.preview)
    selected.value = NaN
    imageUrl.value.original = ''
    imageUrl.value.preview = ''
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Файлы" />

      <UDashboardPanelContent>
        <div class="flex h-full divide-x divide-zinc-700">
          <div class="flex-1">
            <div class="flex flex-wrap gap-3">
              <FilesBack v-if="!isBasePath" @click="goBack" />
              <div v-for="(src, i) in files" class="size-40 overflow-clip ring-1 ring-zinc-700 rounded">
                <FilesImage v-if="isImage(src)" @click="onImage(src, i)" :src="correctSrc(src)" :selected="selected == i" />
                <FilesFolder v-else :src @dblclick="setSource(src)" @click="selected = Math.random()" />
              </div>
            </div>
          </div>
          <div class="pl-3 w-[450px]">
            <div v-if="imageUrl.original">
              <img :src="imageUrl.original" class="" alt="" />
              <p class="text-wrap break-words">{{ imageUrl }}</p>
              <UButton label="удалить" icon="i-heroicons-trash" variant="outline" color="red" @click="removeFile" />
            </div>
          </div>
        </div>
        <pre>{{ files }}</pre>
        {{ selected }}
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style></style>
