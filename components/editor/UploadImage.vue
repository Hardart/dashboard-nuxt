<script lang="ts" setup>
const src = defineModel({ required: true })
</script>
<template>
  <UTooltip text="Загрузить фото" :openDelay="0">
    <UiUploadImage
      name="news"
      v-model="src"
      :btn="{
        variant: 'outline',
        icon: 'i-material-symbols-add-photo-alternate-outline-rounded',
        color: 'gray',
        class: 'editor__button'
      }"
    />
  </UTooltip>
</template>
