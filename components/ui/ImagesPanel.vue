<script setup lang="ts">
import type { ImageName } from '~/types'
const { name } = defineProps<{ name: ImageName }>()
const imageUrl = defineModel({ required: true })
const emit = defineEmits(['append-handler', 'close'])
const { getFiles, files, isBasePath, isImage, setSource, goBack } = useFilesystem()

getFiles(name)

const onImage = (src: string) => {
  imageUrl.value = src.replace('_preview', '_orig')
  emit('append-handler')
  emit('close')
}
</script>

<template>
  <div class="grid max-h-96 min-w-[380px] grid-cols-3 justify-items-center gap-4 overflow-y-auto p-4 lg:items-center">
    <div
      class="flex size-24 cursor-pointer flex-col items-center justify-center py-4 hover:bg-neutral-200 dark:hover:bg-slate-800"
      v-if="!isBasePath"
      @click="goBack"
    >
      <UIcon name="i-heroicons-arrow-small-left" class="size-10" />
    </div>
    <div v-for="src in files" class="size-24 overflow-clip rounded-lg ring-1 ring-zinc-700">
      <img v-if="isImage(src)" class="size-24 object-cover" :src="correctImageSrc(src)" alt="" @click="onImage(src)" />
      <div
        v-else
        class="flex cursor-pointer flex-col items-center py-4 hover:bg-neutral-200 dark:hover:bg-slate-800"
        @click="setSource(src)"
      >
        <UIcon name="i-heroicons-folder" class="size-12" />
        <p>{{ src.replace(/.+\//, '') }}</p>
      </div>
    </div>
  </div>
</template>

<style></style>
