<script setup lang="ts">
import type { Article } from '~/scheme/z_article'
const router = useRouter()
const { storeRefs } = useArticleStore()
const { sortedArticles, selectedStatuses, selectedCategories, sort, articlesCount, categoriesFilter, query } = storeRefs()

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
    :statuses="statuses"
    v-model:status="selectedStatuses"
    v-model:category="selectedCategories"
  />
  <ArticlesTable :news="sortedArticles" v-model="sort" :edit-handle="editHandle" />
</template>

<style></style>
