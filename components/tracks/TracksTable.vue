<script setup lang="ts">
import type { Track } from '~/types/track'
defineProps<{
  tracks: Track[]
  pending: boolean
  editItems?: (row: any) => any[]
}>()
const selected = ref<Track[]>([])
const columns = [
  {
    key: 'artistName',
    label: 'Артист',
    sortable: true,
  },
  {
    key: 'trackTitle',
    label: 'Название песни',
    sortable: true,
  },
  {
    key: 'createdAt',
    label: 'Дата содзания',
  },
  {
    key: 'actions',
  },
]
</script>

<template>
  <UTable
    v-model="selected"
    :rows="tracks"
    :loading="pending"
    :columns="columns"
    class="w-full"
    :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
  >
    <template #artistName-data="{ row }">
      <div class="flex items-center gap-3">
        <span class="text-gray-900 dark:text-white font-medium">{{ row.artistName }}</span>
      </div>
    </template>

    <template #trackTitle-data="{ row }">
      <div class="flex items-center gap-3">
        <span class="text-gray-900 dark:text-white font-medium">{{ row.trackTitle }}</span>
      </div>
    </template>

    <template #createdAt-data="{ row }">
      <div class="flex items-center gap-3">
        <span class="text-gray-900 dark:text-white font-medium">{{ new Date(row.createdAt).toLocaleDateString() }}</span>
      </div>
    </template>

    <template #actions-data="{ row }" v-if="editItems">
      <UDropdown :items="editItems(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
</template>

<style></style>
