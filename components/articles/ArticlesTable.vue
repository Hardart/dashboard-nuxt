<script setup lang="ts">
import type { Article } from '~/types'
defineProps<{
  news: Article[]
  editItems?: (row: any) => any[]
}>()
const selected = ref<Article[]>([])
const sort = defineModel({ required: true })
const columns = [
  {
    key: 'title',
    label: 'Название',
    sortable: true,
  },
  {
    key: 'category',
    label: 'Категория',
  },
  {
    key: 'status',
    label: 'Статус',
  },
  {
    key: 'actions',
  },
]
</script>

<template>
  <UTable
    v-model="selected"
    v-model:sort="sort"
    :rows="news"
    :columns="columns"
    sort-mode="manual"
    class="w-full"
    :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
  >
    <template #title-data="{ row }">
      <div class="flex items-center gap-3">
        <span class="text-gray-900 dark:text-white font-medium">{{ row.title }}</span>
      </div>
    </template>

    <template #category-data="{ row }">
      <div class="flex items-center gap-3">
        <span class="text-gray-900 dark:text-white font-medium">{{ row.category.title }}</span>
      </div>
    </template>

    <template #status-data="{ row }">
      <UBadge :label="row.isPublished ? 'yes' : 'no'" :color="row.isPublished ? 'green' : 'red'" variant="subtle" class="capitalize" />
    </template>

    <template #actions-data="{ row }" v-if="editItems">
      <UDropdown :items="editItems(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
</template>

<style></style>
