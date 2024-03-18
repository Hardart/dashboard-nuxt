<script setup lang="ts">
import { STATUSES, type Article } from '~/scheme/z_article'
import { editItems, columns } from './table-config'

const sort = defineModel({ required: true })

defineProps<{
  news: Article[]
  loading: boolean
  editHandle: (item: Article) => void
}>()

const selected = ref<Article[]>([])
</script>

<template>
  <UTable
    v-model="selected"
    v-model:sort="sort"
    :rows="news"
    :loading="loading"
    :columns="columns"
    class="w-full"
    :ui="{ divide: 'divide-gray-200 dark:divide-gray-800', td: { padding: 'py-2' } }"
  >
    <template #title-data="{ row }">
      <div class="flex items-center gap-3">
        <span class="text-gray-900 dark:text-white">{{ row.title }}</span>
      </div>
    </template>

    <template #category-data="{ row }">
      <div class="flex items-center gap-3">
        <span class="text-gray-900 dark:text-white font-medium">{{ row.category.title }}</span>
      </div>
    </template>

    <template #createdAt-data="{ row }">
      <div class="flex items-center gap-3">
        <span class="text-gray-900 dark:text-white font-medium">{{ new Date(row.createdAt).toLocaleString() }}</span>
      </div>
    </template>

    <template #status-data="{ row }">
      <UBadge
        :label="row.status"
        :color="row.status == STATUSES.Publish ? 'green' : row.status == STATUSES.Pending ? 'yellow' : 'red'"
        variant="subtle"
        class="capitalize"
      />
    </template>

    <template #actions-data="{ row }">
      <UDropdown :items="editItems(row, editHandle)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
</template>

<style></style>
