<script setup lang="ts">
const { storeRefs, resetProgram } = useProgramsStore()
const { hosts, loading } = storeRefs()
onUnmounted(resetProgram)
</script>

<template>
  <DashboardNavbar title="Добавить программу" :btn="{ label: 'Назад', icon: 'i-heroicons-arrow-long-left-16-solid' }" />
  <UDashboardPanelContent :ui="{ wrapper: 'flex-row justify-between gap-4' }">
    <ProgramsForm :loading :hosts />
    <ScheduleTable />
  </UDashboardPanelContent>
</template>

<style></style>
