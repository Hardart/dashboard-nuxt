<script lang="ts" setup>
interface IModelImage {
  src: string
  apply: () => void
}
const image = defineModel<IModelImage>({ required: true })
</script>
<template>
  <UiUploadImage
    name="news"
    v-model="image.src"
    @append-handler="image.apply"
    :btn="{ variant: 'outline', icon: 'i-material-symbols-add-photo-alternate-outline-rounded', color: 'gray', class: 'editor__button' }"
  />
</template>
