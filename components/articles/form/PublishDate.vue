<script setup lang="ts">
const publishDate = defineModel({ required: true, type: Date })
</script>

<template>
  <UFormGroup label="Дата публикации" name="publishAt">
    <DatePicker v-model="publishDate" />
  </UFormGroup>
</template>

<style></style>
