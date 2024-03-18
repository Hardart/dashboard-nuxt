<script setup lang="ts">
const { getFiles, files, prevPath, isBasePath, isImage, setSource } = useFilesystem()
getFiles()
</script>

<template>
  <div class="flex flex-wrap lg:items-center gap-4 p-8 w-96">
    <div
      class="flex flex-col items-center size-24 justify-center py-4 hover:bg-neutral-200 dark:hover:bg-slate-800 cursor-pointer"
      v-if="!isBasePath"
      @click="setSource(prevPath)"
    >
      <UIcon name="i-heroicons-arrow-small-left" class="size-20" />
    </div>
    <div v-for="src in files" class="size-24 overflow-clip">
      <img v-if="isImage(src)" class="size-20 object-cover" :src="`http://localhost:3068${src}`" alt="" />
      <div
        v-else
        class="flex flex-col items-center py-4 hover:bg-neutral-200 dark:hover:bg-slate-800 cursor-pointer"
        @click="setSource(src)"
      >
        <UIcon name="i-heroicons-folder" class="size-12" />
        <p>{{ src.replace(/.+\//, '') }}</p>
      </div>
    </div>
  </div>
</template>

<style></style>
