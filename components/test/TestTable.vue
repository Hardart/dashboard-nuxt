<script setup lang="ts">
import type { Program, ProgramSchedule } from '~/scheme/z_program'
import { randomElementFromArray } from '@/utils/random'
import { weekdayIds, weekday } from '@/utils/schedule'
import type { PTest } from '~/types/program'

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
const [isAddProgramModalOpen, toggleAddProgramModalState] = useToggle()
type ProgramState = {
  title?: string
  image?: string
  start?: {
    hh: string
    mm: string
  }
  end?: {
    hh: string
    mm: string
  }
}
const programState = reactive<ProgramState>({
  title: undefined,
  image: undefined,
  start: undefined,
  end: undefined
})

const hours = new Array(24).fill('').map((h, index) => index)

const programsForSchedule = ref<PTest[]>([])
const selectedDays = ref<number[]>([])
const scheduleList = ref<ProgramSchedule[]>([])

const resetProgramData = () => {
  selectedDays.value = []
  scheduleList.value = []
  programState.title = undefined
  programState.image = undefined
}

watch(
  [selectedDays, isTimeEqual],
  () => {
    if (isTimeEqual.value) {
      if (!scheduleList.value.length) scheduleList.value.push(createProgram())
      scheduleList.value = scheduleList.value.slice(0, 1)
      scheduleList.value[0].dayId = selectedDays.value
    } else {
      scheduleList.value = selectedDays.value.map((day) => {
        const p = createProgram()
        p.dayId = [day]
        return p
      })
    }
    if (!selectedDays.value.length) scheduleList.value = []
  },
  { deep: true }
)

programs.forEach((pgm) => {
  const title = pgm.title
  const image = pgm.image
  pgm.schedule.forEach((sch) => {
    const id = programsForSchedule.value.length
    const color = randomElementFromArray(colors.value)
    colors.value = colors.value.filter((c) => c !== color)
    const ids = isNearDay(sch.dayId)
    const start = (sch.start as unknown as string).split(':').reduce((curr, val, index) => {
      if (!index) curr.hh = val
      else curr.mm = val
      return curr
    }, {} as any)
    const end = (sch.end as unknown as string).split(':').reduce((curr, val, index) => {
      if (!index) curr.hh = val
      else curr.mm = val
      return curr
    }, {} as any)
    const isReplay = sch.isReplay

    const schedules = ids.map((item) => ({
      id,
      startFrom: item.startFrom,
      width: item.width,
      start,
      end,
      isReplay,
      color,
      title,
      image
    }))

    programsForSchedule.value.push(...schedules)
  })
})

function createProgram(): ProgramSchedule {
  return {
    dayId: [],
    start: {
      hh: programState.start?.hh || '10',
      mm: programState.start?.mm || '00'
    },
    end: {
      hh: programState.end?.hh || '11',
      mm: programState.end?.mm || '00'
    },
    isReplay: false
  }
}

const onAddSchedule = () => {
  const color = randomElementFromArray(colors.value)
  const title = programState.title
  const image = programState.image
  let schedules
  if (!isTimeEqual.value) {
    schedules = scheduleList.value.map((sch, i) => ({
      id: i,
      startFrom: sch.dayId[0],
      width: 1,
      start: sch.start,
      end: sch.end,
      isReplay: sch.isReplay,
      color,
      title,
      image
    }))
  } else {
    const ids = isNearDay(selectedDays.value)
    const start = scheduleList.value[0].start
    const end = scheduleList.value[0].end
    const isReplay = scheduleList.value[0].isReplay

    schedules = ids.map((item, i) => ({
      id: i,
      startFrom: item.startFrom,
      width: item.width,
      start,
      end,
      isReplay,
      color,
      title,
      image
    }))
  }
  programsForSchedule.value.push(...schedules)
  toggleAddProgramModalState()
  selectedDays.value = []
}

const onAddProgram = () => {
  resetProgramData()
  toggleAddProgramModalState()
}

const onChange = (dayId: number) => {
  if (!selectedDays.value?.includes(dayId)) {
    selectedDays.value?.push(dayId)
  } else {
    selectedDays.value = selectedDays.value.filter((day) => day !== dayId)
  }
  selectedDays.value.sort()
}
const onEveryday = () => (selectedDays.value = weekdayIds)
const onWorkday = () => (selectedDays.value = weekdayIds.slice(0, 5))
const onWeekend = () => (selectedDays.value = weekdayIds.slice(-2))
const onOddDay = () => (selectedDays.value = weekdayIds.filter((day) => day % 2 == 0))
const onClear = () => (selectedDays.value = [])

const onEdit = (program: PTest) => {
  resetProgramData()
  const dayId = new Array(program.width).fill('').map((el, index) => program.startFrom + index)
  selectedDays.value = dayId
  programState.title = program.title || ''
  programState.start = program.start
  programState.end = program.end

  scheduleList.value.push({ isReplay: false, dayId, start: program.start, end: program.end })
  toggleAddProgramModalState()
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
  <div class="m-2">
    <UButton label="Добавить" @click="onAddProgram" />
  </div>

  <UModal v-model="isAddProgramModalOpen" :ui="{ base: 'lg:w-[800px] sm:max-w-none' }">
    <UCard>
      <template #header>
        <div class="grid grid-flow-col grid-cols-4">
          <div class="col-span-3 space-y-8">
            <h3 class="text-2xl font-semibold">Карточка программы</h3>
            <div class="w-2/3">
              <UFormGroup label="Название программы">
                <UInput v-model="programState.title" placeholder="Не меньше 5 символов" />
              </UFormGroup>
            </div>
          </div>
          <div class="col-span-1 justify-self-end">
            <UiImage v-model="programState.image" />
          </div>
        </div>
      </template>
      <div container>
        <div wrapper>
          <div header class="flex border-b border-zinc-800 pb-6">
            <div class="space-y-4">
              <div class="flex gap-8">
                <UCheckbox
                  v-for="day in weekdayIds"
                  :ui="{ base: 'w-5 h-5', label: 'text-sm capitalize' }"
                  :label="weekday(day).short"
                  :modelValue="selectedDays.includes(day)"
                  @change="onChange(day)"
                />
              </div>
              <div buttons class="flex gap-2">
                <UButton label="Каждый день" size="2xs" variant="outline" color="sky" @click="onEveryday" />
                <UButton label="По будням" size="2xs" variant="outline" color="sky" @click="onWorkday" />
                <UButton label="По выходным" size="2xs" variant="outline" color="sky" @click="onWeekend" />
                <UButton label="Через день" size="2xs" variant="outline" color="sky" @click="onOddDay" />
                <UButton label="Сбросить" size="2xs" variant="outline" @click="onClear" />
              </div>
            </div>
            <UFormGroup label="Единое время" class="ml-auto text-center">
              <UToggle v-model="isTimeEqual" />
            </UFormGroup>
          </div>
          <div body class="space-y-4 pt-8">
            <ProgramsFormScheduleTime v-for="schedule in scheduleList" :schedule="schedule" :isTimeEqual />
          </div>
        </div>
      </div>
      <template #footer>
        <UButton
          label="Добавить"
          @click="onAddSchedule"
          :disabled="!programState.title || programState.title?.trim().length < 5 || !selectedDays.length"
        />
      </template>
    </UCard>
  </UModal>
</template>
