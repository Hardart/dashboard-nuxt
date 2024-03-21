<script setup lang="ts">
const { resetArticle, storeRefs, addArticle } = useArticleStore()
const { categories } = useCategoriesStore().storeRefs()
const { articleFormData, tags, loading } = storeRefs()
// onUnmounted(resetArticle)
</script>

<template>
  <DashboardNavbar title="Добавить новостю" :btn="{ label: 'Назад', to: '/articles', icon: 'i-heroicons-arrow-long-left-16-solid' }" />
  <UDashboardPanelContent>
    <ArticlesForm
      :submit-handle="addArticle"
      v-model="articleFormData"
      v-model:tags="tags"
      v-model:categories="categories"
      :loading="loading"
    />
  </UDashboardPanelContent>
</template>

<style></style>
