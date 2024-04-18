<script setup lang="ts">
const { storeRefs, addProgram, editProgram, addSchedule, toggleScheduleModalState } = useProgramsStore()
const { programs, programFormData, scheduleModalState, hosts } = storeRefs()

provide('edit-program', editProgram)
provide('add-program', addProgram)
provide('add-schedule', addSchedule)
provide('program-form-data', programFormData)
</script>

<template>
  <DashboardNavbar title="Добавить программу" :btn="{ label: 'Назад', icon: 'i-heroicons-arrow-long-left-16-solid' }" />
  <UDashboardPanelContent :ui="{ wrapper: 'flex-row justify-between gap-4' }">
    <ProgramsForm :hosts v-model="scheduleModalState" @open-schedule-modal="toggleScheduleModalState(true)" />
    <ScheduleTable v-if="programs" :programs />
  </UDashboardPanelContent>
</template>

<style></style>
