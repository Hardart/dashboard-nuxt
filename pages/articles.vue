<script lang="ts" setup>
import { UploadPath } from '~/scheme/enums'

const { fetchArticles } = useArticleStore()
const { fetchCategories } = useCategoriesStore()
fetchArticles()
fetchCategories()
provide('upload-image', UploadPath.NEWS)
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
