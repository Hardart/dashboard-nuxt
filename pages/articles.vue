<script lang="ts" setup>
const { fetchArticles } = useArticleStore()
const { fetchCategories } = useCategoriesStore()
fetchArticles()
fetchCategories()
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
