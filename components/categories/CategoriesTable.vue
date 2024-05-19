<script setup lang="ts">
import type { Category } from '~/scheme/z_category'
import { columns } from './table-config'
import { STATUSES } from '~/scheme/z_article'
const { deleteCategory } = useCategoriesStore()
defineProps<{ categories: Category[]; loading: boolean }>()
const selected = defineModel('selected', { required: true })
const editItems = (row: Category) => [
  [
    {
      label: 'Редактировать',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        navigateTo(`/categories/${row.id}`)
      }
    }
  ],
  [
    {
      label: 'Удалить',
      icon: 'i-heroicons-trash-20-solid',
      click: () => {
        deleteCategory(row.id)
      }
    }
  ]
]
</script>

<template>
  <UTable
    v-model="selected"
    :loading="loading"
    :rows="categories"
    :columns="columns"
    class="w-full"
    :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
  >
    <template #title-data="{ row }">
      <div class="flex items-center gap-3">
        <span class="text-gray-900 dark:text-white">{{ row.title }}</span>
      </div>
    </template>

    <template #createdAt-data="{ row }">
      <div class="flex items-center gap-3">
        <span class="font-medium text-gray-900 dark:text-white">{{ new Date(row.createdAt).toLocaleDateString() }}</span>
      </div>
    </template>

    <template #updatedAt-data="{ row }">
      <div class="flex items-center gap-3">
        <span class="font-medium text-gray-900 dark:text-white">{{ new Date(row.updatedAt).toLocaleDateString() }}</span>
      </div>
    </template>

    <template #isPublished-data="{ row }">
      <UBadge
        :label="row.isPublished ? STATUSES.Publish : STATUSES.Not_Publish"
        :color="row.isPublished ? 'green' : 'red'"
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

<style>
table th:first-child {
  width: 40px;
}
</style>
