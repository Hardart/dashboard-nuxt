<script setup lang="ts">
const { storeRefs, addSchedule, addProgramFormToProgramList, resetProgramForm } = useNewProgramsStore()
const { programForm, scheduleForEdit, programs, isEdit } = storeRefs()
const [isOpen, changeOpenState] = useToggle()

const onCancelAddSchedule = () => {
  changeOpenState(false)
}

const scheduleProps = [
  {
    color: 'primary',
    icon: 'heroicons:calendar-days-20-solid',
    emit: 'set-days',
    onClick(schedule: NewSchedule, _: number) {
      scheduleForEdit.value = schedule
      scheduleForEdit.value.dayOfWeekIds = [...schedule.dayOfWeekIds]
      changeOpenState()
    }
  },
  {
    color: 'primary',
    icon: 'heroicons:document-duplicate-20-solid',
    emit: 'duplicate',
    onClick(schedule: NewSchedule, index: number) {
      programForm.value.shedules.push({ ...schedule, dayOfWeekIds: [...schedule.dayOfWeekIds] })
    }
  },
  {
    color: 'red',
    icon: 'heroicons:trash-20-solid',
    emit: 'delete',
    onClick(_: NewSchedule, index: number) {
      programForm.value.shedules = programForm.value.shedules.filter((_, i) => i !== index)
    }
  }
]

onUnmounted(resetProgramForm)
</script>

<template>
  <DashboardNavbar title="Редактировать программу" :btn="{ label: 'Назад', icon: 'i-heroicons-arrow-long-left-16-solid' }" />
  <UDashboardPanelContent :ui="{ wrapper: 'flex-row justify-between gap-6' }">
    <PrgForm :schedule-props :program-form :is-edit @new="addSchedule" @append="addProgramFormToProgramList" />
    <SchTable :programs :program-form />
    <UModal v-model="isOpen" :ui="{ base: 'lg:w-[700px] sm:max-w-none mx-auto' }" prevent-close>
      <SchEditDaysModal :schedule="scheduleForEdit" @apply="onCancelAddSchedule()" />
    </UModal>
  </UDashboardPanelContent>
</template>
