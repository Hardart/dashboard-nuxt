<script setup lang="ts">
const { getFiles, files, basePath, isBasePath, isImage, setSource } = useFilesystem()
getFiles()
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Файлы" />

      <UDashboardPanelContent>
        <div class="grid lg:grid-cols-6 lg:items-center gap-4 mt-8">
          <div class="flex flex-col items-center py-4 hover:bg-neutral-200 cursor-pointer" v-if="!isBasePath" @click="setSource(basePath)">
            <UIcon name="i-heroicons-arrow-small-left" class="size-40" />
          </div>
          <div v-for="src in files">
            <img v-if="isImage(src)" :src="`http://localhost:3068${src}`" alt="" />
            <div v-else class="flex flex-col items-center py-4 hover:bg-neutral-200 cursor-pointer" @click="setSource(src)">
              <UIcon name="i-heroicons-folder" class="size-40" />
              <p>{{ src.replace(/.+\//, '') }}</p>
            </div>
          </div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style></style>
