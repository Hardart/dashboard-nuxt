<script setup lang="ts">
const { fetchTracks, storeRefs } = useTracksStore()
const { tracksByPage, page, pageCount, filteredCount } = storeRefs()
const isNewArticleModalOpen = ref(false)

fetchTracks()

onBeforeUnmount(() => {
  page.value = 1
})
</script>

<template>
  <TracksTable :tracks="tracksByPage" :pending="false" :ui="{ td: { padding: 'py-1' } }" />
  <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
    <UPagination v-model="page" :page-count="pageCount" :total="filteredCount" />
  </div>
</template>

<style></style>
