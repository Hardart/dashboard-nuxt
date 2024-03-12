<script setup lang="ts">
import type { CategorySchema } from '@/types/scheme/z_category'
const category = defineModel({ required: true })
defineProps<{ categories: CategorySchema[] }>()
</script>

<template>
  <UFormGroup label="Категория" class="w-1/6 min-w-56" required name="categoryId">
    <USelectMenu v-model="category" :options="categories" option-value="id" option-attribute="title" placeholder="Выбрать категорию" />
  </UFormGroup>
</template>

<style></style>
