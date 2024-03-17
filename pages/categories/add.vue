<script setup lang="ts">
const { storeRefs, addCategory } = useCategoriesStore()
const { categoryFormData } = storeRefs()
</script>

<template>
  <DashboardNavbar title="Добавить категорию" :btn="{ label: 'Назад', to: '/categories', icon: 'i-heroicons-arrow-long-left-16-solid' }" />
  <UDashboardPanelContent>
    <CategoriesForm v-model="categoryFormData" :on-submit="addCategory" />
  </UDashboardPanelContent>
</template>

<style></style>
