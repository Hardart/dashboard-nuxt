<script lang="ts" setup>
const { fetchCategories } = useCategoriesStore()
fetchCategories()
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
