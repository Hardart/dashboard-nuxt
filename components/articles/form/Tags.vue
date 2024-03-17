<script setup lang="ts">
const tag = defineModel({ required: true })
defineProps<{ tags: string[] | undefined }>()
</script>

<template>
  <UFormGroup label="Теги" name="tags" class="w-1/6 min-w-48">
    <USelectMenu v-model="tag" :options="tags" multiple placeholder="Выбрать теги" />
  </UFormGroup>
</template>

<style></style>
