<script lang="ts" setup>
import { useTracksStore } from '~/store/useTracksStore'
const { fetchTracks, storeRefs } = useTracksStore()
const { tracksByPage, page, pageCount, tracksCount, artistFilter, filteredCount } = storeRefs()
const isNewArticleModalOpen = ref(false)

fetchTracks()

const items = (row: any) => [
  [
    {
      label: 'Редактировать',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        isNewArticleModalOpen.value = true
      },
    },
  ],
  [
    {
      label: 'Удалить',
      icon: 'i-heroicons-trash-20-solid',
    },
  ],
]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <TracksNavbar :count="tracksCount" :filtered-count="filteredCount" v-model="artistFilter" />
      <TracksTable :tracks="tracksByPage" :pending="false" :edit-items="items" />
      <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model="page" :page-count="pageCount" :total="filteredCount" />
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>
