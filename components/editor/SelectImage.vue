<script setup lang="ts">
interface IModelImage {
  src: string
  apply: () => void
}
const image = defineModel<IModelImage>({ required: true })
</script>

<template>
  <UiImageSelect
    v-model="image.src"
    :btn="{ square: true, variant: 'outline', color: 'gray', icon: 'i-material-symbols-image-search-rounded', class: 'editor__button' }"
  />
</template>

<style></style>
