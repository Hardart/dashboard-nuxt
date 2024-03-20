<script setup lang="ts">
const imageUrl = defineModel({ required: true })
const emit = defineEmits(['append-handler', 'close'])
const { getFiles, files, isBasePath, isImage, setSource, goBack } = useFilesystem()
getFiles()
const onImage = (src: string) => {
  imageUrl.value = 'http://localhost:3068' + src.replace('_preview', '_orig')
  emit('append-handler')
  emit('close')
}
</script>

<template>
  <div class="flex justify-start flex-wrap lg:items-center gap-4 p-4 w-[355px] max-h-96 overflow-y-auto">
    <div
      class="flex flex-col items-center size-24 justify-center py-4 hover:bg-neutral-200 dark:hover:bg-slate-800 cursor-pointer"
      v-if="!isBasePath"
      @click="goBack"
    >
      <UIcon name="i-heroicons-arrow-small-left" class="size-10" />
    </div>
    <div v-for="src in files" class="size-24 overflow-clip ring-1 ring-zinc-700 rounded-lg">
      <img v-if="isImage(src)" class="size-24 object-cover" :src="`http://localhost:3068${src}`" alt="" @click="onImage(src)" />
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
