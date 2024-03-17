<script setup lang="ts">
import type { Category } from '@/scheme/z_category'
const categoryId = defineModel({ required: true })
defineProps<{ categories: Category[] }>()
</script>

<template>
  <UFormGroup label="Категория" class="w-1/5 min-w-48" required name="categoryId">
    <USelectMenu v-model="categoryId" :options="categories" value-attribute="id" option-attribute="title" placeholder="Выбрать категорию" />
  </UFormGroup>
</template>
