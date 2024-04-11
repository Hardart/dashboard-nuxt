<script setup lang="ts">
import type { ProgramSchedule } from '~/scheme/z_program'
import type { ScheduleProps } from '~/types/program'

type ScheduleState = {
  properties?: ScheduleProps
  weekdayIds?: number[]
}

type ProgramState = {
  title?: string
  image?: string
  schedule?: ScheduleState[]
}

const selectedDayIds = defineModel<number[]>('ids', { required: true })
const programState = defineModel<ProgramState>('state', { required: true })
const isTimeEqual = defineModel<boolean>('time', { required: true })

defineProps<{
  scheduleList: ProgramSchedule[]
}>()
defineEmits(['on-change'])

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
                :modelValue="selectedDayIds.includes(day)"
                @change="$emit('on-change', day)"
              />
            </div>
            <ProgramsCardWeekdayBtnList v-model="selectedDayIds" />
          </div>
          <UFormGroup label="Единое время" class="ml-auto text-center">
            <UToggle v-model="isTimeEqual" />
          </UFormGroup>
        </div>
        <div body class="space-y-4 pt-8">
          <div class="relative min-h-32 w-full space-y-4 border p-4" v-for="sch in programState.schedule">
            <div class="absolute -top-3 left-3 bg-zinc-900 px-2">
              {{ selectedIdsToWeekday(selectedDayIds) }}
            </div>
            <div class="w-full border border-indigo-600 p-10" v-for="prop in sch.properties"></div>
          </div>
          <!-- <ProgramsFormScheduleTime v-for="schedule in scheduleList" :schedule="schedule" :isTimeEqual /> -->
        </div>
      </div>
    </div>
    <template #footer>
      <UButton
        label="Добавить"
        :disabled="!programState.title || programState.title?.trim().length < 5 || !selectedDayIds.length"
      />
    </template>
  </UCard>
</template>
