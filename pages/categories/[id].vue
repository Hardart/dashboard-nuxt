<script setup lang="ts">
const route = useRoute()
const { storeRefs, updateCategory, findOne } = useCategoriesStore()
const { categoryFormData } = storeRefs()
findOne(`${route.params.id}`)
</script>

<template>
  <DashboardNavbar
    title="Редактировать категорию"
    :btn="{ label: 'Назад', to: '/categories', icon: 'i-heroicons-arrow-long-left-16-solid' }"
  />
  <UDashboardPanelContent>
    <CategoriesForm v-model="categoryFormData" :on-submit="updateCategory" />
  </UDashboardPanelContent>
</template>

<style></style>
