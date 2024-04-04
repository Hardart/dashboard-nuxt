<script setup lang="ts">
const { storeRefs, deleteSchedule, addProgram } = useProgramsStore()
const {
  selectedScheduleMode,
  isSameTime,
  isCustomMode,
  selectedScheduleDays,
  selectedWeekdayIds,
  scheduleModeDayIds,
  weekdays,
  onChange
} = useSchedule()
const { programState } = storeRefs()
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
  <div class="max-w-4xl divide-y divide-zinc-700">
    <div class="grid grid-cols-5 gap-6">
      <div class="col-span-3">
        <UFormGroup label="Название программы" class="flex-grow">
          <UInput v-model="programState.title" />
        </UFormGroup>
        <ProgramsFormScheduleList
          :delete-handle="deleteSchedule"
          :weekdays
          :program-state
        />
        <UButton
          label="Добавить расписание"
          @click="toggleModalState(true)"
          class="mt-8"
        />
      </div>
      <div class="col-span-2">
        <FormImageUpload v-model="programState.image" name="programs" />
      </div>
    </div>
    <div class="mt-6 py-6 text-right">
      <UButton label="Добавить программу" @click="addProgram" />
    </div>
    {{ programState }}

    <UModal v-model="isModalOpen" :ui="{ base: 'lg:w-[900px] sm:max-w-none' }">
      <div class="grid grid-cols-5 p-6">
        <div class="col-span-1 flex flex-col gap-8">
          <ProgramsFormScheduleShowDays v-model="selectedScheduleMode" />
          <UFormGroup label="Единое время">
            <UToggle v-model="isSameTime" />
          </UFormGroup>
        </div>

        <div class="col-span-4 space-y-4 py-2">
          <ProgramsFormScheduleWeekdays
            :on-change="onChange"
            :weekdays="weekdays"
            :is-custom-mode="isCustomMode"
          />
          <ProgramsFormScheduleItemList
            :selected-days-schedule="selectedScheduleDays"
            :weekdays="weekdays"
            :selected-days="selectedWeekdayIds"
            :day-ids="scheduleModeDayIds"
            :is-custom-mode="isCustomMode"
            :is-same-time="isSameTime"
          />
        </div>

        <div class="mt-8">
          <UButton
            label="Добавить"
            @click="onAddSchedule"
            :disabled="!selectedScheduleDays.length"
          />
        </div>
      </div>
    </UModal>
  </div>
</template>

<style></style>
