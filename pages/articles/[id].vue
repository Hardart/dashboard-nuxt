<script setup lang="ts">
const route = useRoute()
const id = String(route.params.id)
const { storeRefs, updateArticle, fetchArticle, resetArticle } = useArticleStore()
const { categories } = useCategoriesStore().storeRefs()
const { articleFormData, tags, loading } = storeRefs()
await fetchArticle(id)
onUnmounted(resetArticle)
</script>

<template>
  <UDashboardNavbar title="Редактировать новостю">
    <template #right>
      <UButton label="Назад" icon="i-heroicons-arrow-long-left-16-solid" color="gray" to="/articles" />
    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent>
    <ArticlesForm :submit-handle="updateArticle" :loading v-model="articleFormData" v-model:tags="tags" v-model:categories="categories" />
  </UDashboardPanelContent>
</template>

<style></style>
