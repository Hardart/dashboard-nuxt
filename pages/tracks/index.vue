<script setup lang="ts">
const { fetchTracks, storeRefs, toggleEditTrackModalState } = useTracksStore()
const { tracksByPage, page, pageCount, filteredCount, track, isTrackEditModalOpen } = storeRefs()

fetchTracks()

onBeforeUnmount(() => {
  page.value = 1
})
</script>

<template>
  <UDashboardModal
    v-model="isTrackEditModalOpen"
    title="Редактировать информацю о треке"
    description="Изменить и записать информацию в базу"
    :ui="{ width: 'sm:max-w-3xl' }"
  >
    <!-- ~/components/users/TracksForm.vue -->
    <TracksForm @close="toggleEditTrackModalState" />
  </UDashboardModal>
  <TracksTable
    :tracks="tracksByPage"
    v-model="track"
    :pending="false"
    :toggle-modal="toggleEditTrackModalState"
    :ui="{ td: { padding: 'py-1' } }"
  />
  <div v-if="filteredCount > 20" class="flex px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
    <UPagination v-model="page" :page-count="pageCount" :total="filteredCount" />
  </div>
</template>

<style></style>
