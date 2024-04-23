<script setup lang="ts">
const route = useRoute()
const id = String(route.params.id)
const { findProgramById, storeRefs } = useProgramsStore()
findProgramById(id)
const { hosts } = storeRefs()
// onUnmounted(resetArticle)
</script>

<template>
  <DashboardNavbar title="Редактировать программу" :btn="{ label: 'Назад', icon: 'i-heroicons-arrow-long-left-16-solid' }" />
  <UDashboardPanelContent :ui="{ wrapper: 'flex-row justify-between gap-4' }">
    <ProgramsForm :hosts />
    <ScheduleTable />
  </UDashboardPanelContent>
</template>

<style></style>
