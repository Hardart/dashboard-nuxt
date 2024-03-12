<script setup lang="ts">
const tag = defineModel({ required: true })
defineProps<{ tags: string[] | undefined }>()
</script>

<template>
  <UFormGroup label="Теги" name="tags" class="min-w-44">
    <USelectMenu v-model="tag" :options="tags" multiple placeholder="Выбрать теги" />
  </UFormGroup>
</template>

<style></style>
