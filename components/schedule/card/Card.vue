<script setup lang="ts">
type Properties = Record<string, ProgramSchedulePropsItem[]>
import type { ProgramSchedulePropsItem } from '~/scheme/z_program'
const selectedWeekdayIds = defineModel<number[]>('ids', { required: true })
const isTimeEqual = defineModel<boolean>('time', { required: true })

const scheduleInfoState = defineModel<Properties>('info', { required: true })

const addSchedule = inject<(p: Properties) => void>('add-schedule')
if (typeof addSchedule === 'undefined') throw createError("can't inject add function")
</script>

<template>
  <UCard>
    <template #header>
      <ScheduleCardHeader v-model="selectedWeekdayIds" v-model:time="isTimeEqual" />
    </template>
    <ScheduleCardBody v-model:info="scheduleInfoState" v-model:time="isTimeEqual" v-model="selectedWeekdayIds" />
    <template #footer>
      <UButton label="Добавить" :disabled="!selectedWeekdayIds.length" @click="addSchedule(scheduleInfoState)" />
    </template>
  </UCard>
</template>
