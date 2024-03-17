<script setup lang="ts">
import type { Category } from '~/scheme/z_category'
import { columns } from './table-config'
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
      },
    },
  ],
  [
    {
      label: 'Удалить',
      icon: 'i-heroicons-trash-20-solid',
      click: () => {
        deleteCategory(row.id)
      },
    },
  ],
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
