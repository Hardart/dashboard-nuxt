<script setup lang="ts">
import type { ProgramSchedule, ProgramSchedulePropsItem, ProgramStateSchema } from '~/scheme/z_program'

// const { storeRefs, deleteSchedule, addProgram } = useProgramsStore()
const { isTimeEqual, selectedIdsToWeekday, setScheduleTimeString } = useSchedule()
const [isModalOpen, toggleModalState] = useToggle()
const selectedWeekdayIds = ref<number[]>([])
const scheduleInfoState = ref<Record<string, ProgramSchedulePropsItem[]>>({})
const programState = reactive<ProgramStateSchema>({
  title: undefined,
  image: undefined,
  color: undefined,
  schedule: []
})

const scheduleState = reactive<ProgramSchedule>({
  properties: [],
  weekdayIds: []
})
const resetScheduleState = () => {
  selectedWeekdayIds.value = []
  scheduleInfoState.value = {}
}
const onAddProgram = () => {}
const onAddSchedule = (properties: Record<string, ProgramSchedulePropsItem[]>) => {
  Object.entries(properties).forEach(([key, value]) => {
    scheduleState.weekdayIds = parseInt(key) === 0 ? selectedWeekdayIds.value : [parseInt(key)]
    scheduleState.properties = value
    programState.schedule.push({ ...scheduleState })
  })
  toggleModalState()
  resetScheduleState()
}
</script>

<template>
  <div class="max-w-4xl divide-y divide-zinc-700">
    <div class="grid grid-cols-5 gap-6">
      <div class="col-span-4">
        <UFormGroup label="Название программы" class="flex-grow">
          <UInput v-model="programState.title" />
        </UFormGroup>
        <UButton label="Добавить расписание" @click="toggleModalState(true)" class="mt-8" />
        <ul>
          <li v-for="schedule in programState.schedule" class="border-primary relative my-2 rounded-lg border p-2">
            <h4>{{ selectedIdsToWeekday(schedule.weekdayIds) }}</h4>
            <ul class="flex gap-2">
              <li v-for="info in schedule.properties" class="relative mt-1">
                <p class="border-primary/30 rounded-lg border px-5 py-1.5 pt-2 text-sm leading-3">
                  {{ setScheduleTimeString(info) }}
                </p>
                <div v-if="info.isReplay" class="absolute -top-1.5 right-2 text-xs">п</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="col-span-1">
        <UiImage size="size-44" v-model="programState.image" />
      </div>
    </div>

    <div class="mt-6 py-6 text-right">
      <UButton label="Добавить программу" @click="onAddProgram" />
    </div>

    <UModal v-model="isModalOpen" :ui="{ base: 'lg:w-[900px] sm:max-w-none' }">
      <ScheduleCard
        v-model:ids="selectedWeekdayIds"
        v-model:time="isTimeEqual"
        @on-add="onAddSchedule"
        v-model:info="scheduleInfoState"
      />
    </UModal>
  </div>
</template>

<style></style>
