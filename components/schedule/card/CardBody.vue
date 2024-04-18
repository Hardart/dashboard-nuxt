<script setup lang="ts">
import type { ProgramSchedulePropsItem } from '~/scheme/z_program'

const selectedWeekdayIds = defineModel<number[]>({ required: true })
const isTimeEqual = defineModel<boolean>('time', { required: true })
const scheduleInfoState = defineModel<Record<string, ProgramSchedulePropsItem[]>>('info', { required: true })

const scheduleProp = () => ({ start: { hh: '00', mm: '00' }, end: { hh: '01', mm: '00' }, isReplay: false })
watch(
  [isTimeEqual, selectedWeekdayIds],
  () => {
    if (isTimeEqual.value) {
      if (!scheduleInfoState.value[0]) scheduleInfoState.value[0] = [scheduleProp()]
    } else {
      selectedWeekdayIds.value.forEach((id) => {
        if (!scheduleInfoState.value[id]) scheduleInfoState.value[id] = [scheduleProp()]
      })
    }

    if (!selectedWeekdayIds.value.length) scheduleInfoState.value = {}
  },
  { deep: true, immediate: true }
)

const onAddInfo = (id?: number) => {
  scheduleInfoState.value[typeof id !== 'undefined' && !isTimeEqual.value ? id : 0].push(scheduleProp())
}

const onRemoveInfo = (id?: number) => {
  scheduleInfoState.value[typeof id !== 'undefined' && !isTimeEqual.value ? id : 0].pop()
}
</script>
<template>
  <div body class="space-y-8" v-if="selectedWeekdayIds.length">
    <ScheduleCardTimeList
      v-if="isTimeEqual"
      :is-time-equal
      :schedule-info-state
      :ids="selectedWeekdayIds"
      @add-info="onAddInfo"
      @remove-info="onRemoveInfo"
    />

    <ScheduleCardTimeList
      v-else
      v-for="weekdayId in selectedWeekdayIds"
      :is-time-equal
      :schedule-info-state
      :ids="weekdayId"
      @add-info="onAddInfo"
      @remove-info="onRemoveInfo"
    />
  </div>
</template>
