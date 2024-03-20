<script setup lang="ts">
import type { Article } from '~/scheme/z_article'
const router = useRouter()
const { storeRefs, deleteArticle } = useArticleStore()
const { sortedArticles, selectedStatuses, statusesFilter, selectedCategories, sort, articlesCount, categoriesFilter, query, loading } =
  storeRefs()

const statuses = ['опубликовано', 'не опубликовано', 'в ожидании']

const editHandle = (item: Article) => {
  router.push(`/articles/${item.id}`)
}
</script>

<template>
  <DashboardNavbar
    title="Новости"
    :badge="articlesCount"
    :btn="{ label: 'Добавить новость', to: '/articles/add', 'trailing-icon': 'i-heroicons-plus' }"
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
