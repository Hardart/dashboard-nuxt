<script setup lang="ts">
import { PROGRAM_STATE } from '~/enums/programsEnum'
import { SCHEDULE_STATE } from '~/enums/scheduleEnum'
const {
  getProgramList,
  updateProgram,
  saveProgram,
  addSchedule,
  editSchedule,
  cancelSaveSchedule,
  saveSchedule,
  removeSchedule,
  deleteProgram,
  storeRefs
} = useProgramsStore()
await getProgramList()
const { programFormData, programs } = storeRefs()

provide(PROGRAM_STATE.FORM_DATA, programFormData)
provide(PROGRAM_STATE.EDIT, updateProgram)
provide(PROGRAM_STATE.SAVE, saveProgram)
provide(PROGRAM_STATE.DELETE, deleteProgram)
provide(PROGRAM_STATE.LIST, programs)
provide(SCHEDULE_STATE.ADD, addSchedule)
provide(SCHEDULE_STATE.EDIT, editSchedule)
provide(SCHEDULE_STATE.SAVE, saveSchedule)
provide(SCHEDULE_STATE.CANCEL, cancelSaveSchedule)
provide(SCHEDULE_STATE.DELETE, removeSchedule)
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style></style>
