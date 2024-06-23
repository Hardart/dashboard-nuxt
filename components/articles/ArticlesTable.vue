<script setup lang="ts">
import { STATUSES, type Article } from '~/scheme/z_article'
import { columns } from './table-config'

const sort = defineModel({ required: true })

const { deleteHandle } = defineProps<{
  news: Article[]
  loading: boolean
  deleteHandle: (item: string) => void
}>()

const selected = ref<Article[]>([])

const editItems = (article: Article) => [
  [
    {
      label: 'Редактировать',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        navigateTo(`/articles/${article.id}`)
      }
    }
  ],
  [
    {
      label: 'Удалить',
      icon: 'i-heroicons-trash-20-solid',
      click: () => {
        deleteHandle(article.id)
      }
    }
  ]
]
</script>

<template>
  <UTable
    v-model="selected"
    v-model:sort="sort"
    :rows="news"
    :loading
    :columns
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
        <span class="font-medium text-gray-900 dark:text-white">{{ row.category.title }}</span>
      </div>
    </template>

    <template #createdAt-data="{ row }">
      <div class="flex items-center gap-3">
        <span class="font-medium text-gray-900 dark:text-white">{{ new Date(row.createdAt).toLocaleString() }}</span>
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
      <UDropdown :items="editItems(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
</template>

<style></style>
