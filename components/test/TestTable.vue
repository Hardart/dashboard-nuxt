<script setup lang="ts">
import type { Program, ProgramSchedule } from '~/scheme/z_program'
import { randomElementFromArray } from '@/utils/random'
import { weekdayIds, weekday } from '@/utils/schedule'
import type { PTest, ScheduleProps } from '~/types/program'

const isOpen = defineModel<boolean>({ required: true })
const { programs } = defineProps<{
  programs: Program[]
}>()

const colors = ref([
  'bg-red-700/60',
  'bg-green-600/60',
  'bg-violet-500/60',
  'bg-yellow-500/60',
  'bg-sky-600/60',
  'bg-orange-600/60',
  'bg-emerald-600/60',
  'bg-purple-700/60',
  'bg-amber-600/60',
  'bg-lime-500/60',
  'bg-teal-800/60',
  'bg-cyan-500/60',
  'bg-blue-900/60',
  'bg-fuchsia-700/60'
])

const { isNearDay, isTimeEqual } = useSchedule()
const toggleAddProgramModalState = useToggle(isOpen)

type ProgramState = {
  title?: string
  image?: string
  schedule?: ScheduleState[]
}

type ScheduleState = {
  properties?: ScheduleProps
  weekdayIds?: number[]
}

const scheduleState = reactive<ScheduleState>({
  properties: undefined,
  weekdayIds: undefined
})
const programState = reactive<ProgramState>({
  title: undefined,
  image: undefined,
  schedule: undefined
})

const hours = new Array(24).fill('').map((h, index) => index)

const programsForSchedule = ref<PTest[]>([])
const selectedDayIds = ref<number[]>([])

const scheduleList = ref<ProgramSchedule[]>([])
const scheduleProps = ref<ScheduleProps[]>([])

const resetProgramData = () => {
  selectedDayIds.value = []
  scheduleList.value = []
  scheduleProps.value = []
  programState.title = undefined
  programState.image = undefined
}

const onEdit = (program: PTest) => {
  resetProgramData()
  const dayId = new Array(program.width).fill('').map((el, index) => program.startFrom + index)
  selectedDayIds.value = dayId
  programState.title = program.title || ''

  toggleAddProgramModalState()
}

const onChange = (dayId: number) => {
  if (!selectedDayIds.value?.includes(dayId)) selectedDayIds.value?.push(dayId)
  else selectedDayIds.value = selectedDayIds.value.filter((day) => day !== dayId)
  selectedDayIds.value.sort()
}

watch(
  [selectedDayIds],
  () => {
    if (isTimeEqual.value) {
      scheduleState.weekdayIds = selectedDayIds.value
    }
  },
  { deep: true }
)

function addProps(): ScheduleProps {
  return { start: { hh: '12', mm: '00' }, end: { hh: '13', mm: '00' }, isReplay: false }
}

const selectedIdsToWeekday = (array: number[]) => {
  switch (true) {
    case array.length == 7:
      return 'Каждый день'
    case array.length == 5 && array[0] === 1 && array[4] === 5:
      return 'По будням'
    case array.length == 2 && array.includes(6 && 7):
      return 'По выходным'
    default:
      return array.map((n) => weekdays.find((day) => day.id === n)?.title.full || '').join(', ')
  }
}
</script>

<template>
  <div class="m-2 flex w-max select-none flex-col overflow-y-auto border-4 border-zinc-700">
    <!-- HEADER -->
    <div class="z-30 flex h-8 border-b-2 border-zinc-700 bg-zinc-600">
      <div
        v-for="i in 8"
        class="grid flex-grow place-items-center capitalize first:w-20 first:flex-grow-0 first:opacity-0"
      >
        {{ weekday(i - 1).short }}
      </div>
    </div>
    <!-- BODY -->
    <div class="relative z-0 flex h-full w-full overflow-y-auto">
      <TestTableTime :hours="hours" />
      <TestTableDay v-for="day in weekdayIds" :day="day" :hours="hours" />
      <TestProgram v-for="prog in programsForSchedule" :program="prog" @on-edit="onEdit" />
    </div>
  </div>
  {{ programState }}
  <!-- <div class="m-2">
    <UButton label="Добавить" @click="$emit('onAddProgram', onAddProgram)" />
  </div> -->

  <UModal v-model="isOpen" :ui="{ base: 'lg:w-[800px] sm:max-w-none' }">
    <ProgramsCard
      v-model:ids="selectedDayIds"
      v-model:state="programState"
      v-model:time="isTimeEqual"
      :schedule-list
      @on-change="onChange"
    />
  </UModal>
</template>
