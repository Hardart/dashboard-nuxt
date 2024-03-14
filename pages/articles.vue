<script lang="ts" setup>
const { fetchArticles, storeRefs, transformArticleToFormData, resetArticle } = useArticleStore()
await fetchArticles()
const { articles, articleFormData, selectedStatuses, selectedCategories, sort, q, categories, query, articlesCount } = storeRefs()

const isNewArticleModalOpen = ref(false)
const statuses = [
  { option: 'опубликовано', value: true },
  { option: 'не опубликовано', value: false },
]

const items = (row: any) => [
  [
    {
      label: 'Редактировать',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        articleFormData.value = transformArticleToFormData(row)
        isNewArticleModalOpen.value = true
      },
    },
  ],
  [
    {
      label: 'Удалить',
      icon: 'i-heroicons-trash-20-solid',
    },
  ],
]
const addArticle = () => {
  resetArticle()
  isNewArticleModalOpen.value = true
}

watch(query, fetchArticles)
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <ArticlesNavbar :add-handle="addArticle" v-model="q" :news-count="articlesCount" />

      <ArticlesToolbar
        :categories="categories"
        :statuses="statuses"
        v-model:status="selectedStatuses"
        v-model:category="selectedCategories"
      />

      <UDashboardModal
        v-model="isNewArticleModalOpen"
        title="Добавить новость"
        description="Добавить новостную запись в базу данных"
        :ui="{ width: 'sm:max-w-5xl' }"
      >
        <!-- ~/components/users/ArticlesForm.vue -->
        <ArticlesForm @close="isNewArticleModalOpen = false" />
      </UDashboardModal>

      <ArticlesTable :news="articles" :edit-items="items" v-model="sort" />
    </UDashboardPanel>
  </UDashboardPage>
</template>
