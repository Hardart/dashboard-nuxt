<script setup lang="ts">
const { storeRefs, deleteArticle } = useArticleStore()
const { sortedArticles, selectedStatuses, statusesFilter, selectedCategories, sort, articlesCount, categoriesFilter, query, loading } =
  storeRefs()
</script>

<template>
  <DashboardNavbar
    title="Новости"
    :badge="articlesCount"
    :btn="{ label: 'добавить новость', to: '/articles/add', icon: 'i-heroicons-plus' }"
    query-input
    v-model="query"
  />
  <ArticlesToolbar
    :categories="categoriesFilter"
    :statuses="statusesFilter"
    v-model:status="selectedStatuses"
    v-model:category="selectedCategories"
  />
  <ArticlesTable :loading :news="sortedArticles" v-model="sort" :delete-handle="deleteArticle" />
</template>

<style></style>
