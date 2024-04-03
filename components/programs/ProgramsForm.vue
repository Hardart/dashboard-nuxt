<script setup lang="ts">
const { storeRefs, deleteSchedule, onChange } = useProgramsStore()
const {
  programState,
  selectedScheduleMode,
  isSameTime,
  isCustomMode,
  selectedScheduleDays,
  selectedWeekdayIds,
  scheduleModeDayIds,
  weekdays,
} = storeRefs()
const [isModalOpen, toggleModalState] = useToggle()
const onAddSchedule = () => {
  programState.schedule.push(...selectedScheduleDays.value)
  toggleModalState()
  resetScheduleState()
}

function resetScheduleState() {
  selectedScheduleDays.value = []
  selectedScheduleMode.value = 'everyday'
  isSameTime.value = true
}
</script>

<template>
  <div class="w-3/5">
    <div class="grid grid-cols-5 gap-6">
      <div class="col-span-3">
        <UFormGroup label="Название программы" class="flex-grow">
          <UInput v-model="programState.title" />
        </UFormGroup>
        <ProgramsFormScheduleList :delete-handle="deleteSchedule" :weekdays="weekdays" :program-state="programState" />
        <UButton label="Добавить расписание" @click="toggleModalState(true)" class="mt-8" />
      </div>
      <div class="col-span-2">
        <FormImageUpload v-model="programState.image" name="programs"/>
      </div>
    </div>

    <UModal v-model="isModalOpen" :ui="{ base: 'lg:w-[900px] sm:max-w-none' }">
      <div class="grid grid-cols-5 p-6">
        <div class="flex flex-col gap-8 col-span-1">
          <ProgramsFormScheduleShowDays v-model="selectedScheduleMode" />
          <UFormGroup label="Единое время">
            <UToggle v-model="isSameTime" />
          </UFormGroup>
        </div>

        <div class="col-span-4 space-y-4 py-2">
          <ProgramsFormScheduleWeekdays :on-change="onChange" :weekdays="weekdays" :is-custom-mode="isCustomMode" />
          <ProgramsFormScheduleItemList
            :selected-days-schedule="selectedScheduleDays"
            :weekdays="weekdays"
            :selected-days="selectedWeekdayIds"
            :day-ids="scheduleModeDayIds"
            :is-custom-mode="isCustomMode"
            :is-same-time="isSameTime"
          />
        </div>

        <div class="mt-8"><UButton label="Добавить" @click="onAddSchedule" :disabled="!selectedScheduleDays.length" /></div>
      </div>
    </UModal>
  </div>
</template>

<style></style>
