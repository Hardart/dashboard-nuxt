<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const id = String(route.params.id)

// onUnmounted(resetArticle)
</script>

<template>
  <DashboardNavbar title="Редактировать программу" :btn="{ label: 'Назад', icon: 'i-heroicons-arrow-long-left-16-solid' }" />
  <UDashboardPanelContent>
    <!-- <ArticlesForm :submit-handle="updateArticle" :loading v-model="articleFormData" v-model:tags="tags" v-model:categories="categories" /> -->
  </UDashboardPanelContent>
</template>

<style></style>
