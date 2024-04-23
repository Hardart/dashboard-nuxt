<script setup lang="ts">
const { storeRefs } = useProgramsStore()
const { hosts } = storeRefs()
</script>

<template>
  <DashboardNavbar title="Добавить программу" :btn="{ label: 'Назад', icon: 'i-heroicons-arrow-long-left-16-solid' }" />
  <UDashboardPanelContent :ui="{ wrapper: 'flex-row justify-between gap-4' }">
    <ProgramsForm :hosts />
    <ScheduleTable />
  </UDashboardPanelContent>
</template>

<style></style>
