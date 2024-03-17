<script lang="ts" setup>
const { storeRefs } = useTracksStore()
const { tracksCount, artistFilter, filteredCount } = storeRefs()
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <TracksNavbar :count="tracksCount" :filtered-count="filteredCount" v-model="artistFilter" />
      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
