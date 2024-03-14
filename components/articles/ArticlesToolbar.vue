<script setup lang="ts">
const selectedStatuses = defineModel('status')
const selectedCategories = defineModel('category')
defineProps<{
  statuses: any[]
  categories: any[]
}>()
</script>

<template>
  <UDashboardToolbar>
    <template #left>
      <USelectMenu
        v-model="selectedStatuses"
        icon="i-heroicons-check-circle"
        placeholder="Статус"
        multiple
        :options="statuses"
        option-attribute="option"
        value-attribute="value"
        :ui-menu="{ option: { base: 'capitalize' } }"
        class="min-w-[150px]"
      />
      <USelectMenu
        v-model="selectedCategories"
        icon="i-heroicons-presentation-chart-bar"
        placeholder="Категории"
        multiple
        :options="categories"
        option-attribute="title"
        value-attribute="id"
        :ui-menu="{ option: { base: 'capitalize' } }"
        class="min-w-[180px]"
      />
    </template>
  </UDashboardToolbar>
</template>

<style></style>
