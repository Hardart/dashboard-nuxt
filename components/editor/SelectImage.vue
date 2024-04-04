<script setup lang="ts">

const src = defineModel({ required: true })
</script>

<template>
  <UiImageSelect
    v-model="src"
    :btn="{ square: true, variant: 'outline', color: 'gray', icon: 'i-material-symbols-image-search-rounded', class: 'editor__button' }"
  />
</template>

<style></style>
