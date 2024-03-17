<script setup lang="ts">
import type { Track } from '~/types/track'
import { columns, editItems } from './table-config'
const track = defineModel({ required: true })
const { toggleModal } = defineProps<{
  tracks: Track[]
  pending: boolean
  toggleModal: () => void
}>()
const selected = ref<Track[]>([])
const showInfo = (item: Track) => {
  track.value = item
  toggleModal()
}
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
    <template #cover-data="{ row }">
      <div class="flex items-center gap-3">
        <UAvatar :src="row.cover" :alt="row.artistName" />
      </div>
    </template>
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

    <template #actions-data="{ row }">
      <UDropdown :items="editItems(row, showInfo)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
</template>

<style>
table td:first-child {
  width: 40px;
}
</style>
