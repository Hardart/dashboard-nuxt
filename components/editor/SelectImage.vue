<script setup lang="ts">
const src = defineModel({ required: true })
</script>

<template>
  <UTooltip text="Выбрать фото" :openDelay="0">
    <UiImageSelectOld
      v-model="src"
      :btn="{
        square: true,
        variant: 'outline',
        color: 'gray',
        icon: 'i-material-symbols-image-search-rounded',
        class: 'editor__button'
      }"
    />
  </UTooltip>
</template>

<style></style>
