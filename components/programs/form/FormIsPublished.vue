<script setup lang="ts">
const isPublished = defineModel({ required: true, type: Boolean })
</script>

<template>
  <UFormGroup label="Опубликовано" name="isPublished" class="text-center">
    <UToggle v-model="isPublished" class="my-1" size="lg" />
  </UFormGroup>
</template>

<style></style>
