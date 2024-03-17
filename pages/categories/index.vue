<script setup lang="ts">
const { categories, categoriesCount, selectedCategories, loading } = useCategoriesStore().storeRefs()
</script>

<template>
  <DashboardNavbar
    title="Категории"
    :badge="categoriesCount"
    :btn="{ label: 'Добавить категорию', to: '/categories/add', icon: 'i-heroicons-plus' }"
  />
  <CategoriesTable :categories="categories" v-model:selected="selectedCategories" :loading="loading" />
</template>

<style></style>
