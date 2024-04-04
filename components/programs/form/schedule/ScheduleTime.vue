<script setup lang="ts">
import type { ProgramSchedule } from '~/scheme/z_program'
const props = defineProps<{
  schedule: ProgramSchedule
}>()

const endHours = computed(calcEndHours)
const endMinutes = computed(calcEndMinutes)

const isHoursEqual = () => props.schedule.end.hh == props.schedule.start.hh
const isEndMinutesOverStart = () => props.schedule.end.mm <= props.schedule.start.mm
const isEndHourOverStart = () => props.schedule.end.hh <= props.schedule.start.hh
const isStartHourValueLast = () => props.schedule.start.hh === '23'
const isStarMinutesValueLast = () => props.schedule.start.mm === '55'
const isEndMinutesOverStartAndHoursEqual = () => isEndMinutesOverStart() && isHoursEqual()

const watchStartHour = () => {
  props.schedule.end.hh = isEndHourOverStart() ? props.schedule.start.hh : props.schedule.end.hh
  props.schedule.end.mm = isEndMinutesOverStartAndHoursEqual() ? increaseTime(props.schedule.start.mm, 5, 'mm') : props.schedule.end.mm
  if (isHoursEqual() && isStarMinutesValueLast()) props.schedule.end.hh = increaseTime(props.schedule.start.hh, 1)
}

const watchStartMinutesAndEndHour = () => {
  props.schedule.end.mm = isEndMinutesOverStartAndHoursEqual() ? increaseTime(props.schedule.start.mm, 5, 'mm') : props.schedule.end.mm
  if (isStarMinutesValueLast() && isHoursEqual()) props.schedule.end.hh = increaseTime(props.schedule.end.hh, 1)
}

watch(() => props.schedule.start.hh, watchStartHour)
watch([() => props.schedule.start.mm, () => props.schedule.end.hh], watchStartMinutesAndEndHour)

function calcEndHours() {
  return hours.filter(h => {
    if (isStartHourValueLast()) return h
    else if (isStarMinutesValueLast()) return h > props.schedule.start.hh
    else return h >= props.schedule.start.hh
  })
}

function calcEndMinutes() {
  return isHoursEqual() ? minutes.filter(m => m > props.schedule.start.mm) : minutes
}

function increaseTime(value: number | string, inc: number, type: 'mm' | 'hh' = 'hh') {
  const time = (typeof value === 'number' ? value : parseInt(value)) + inc
  const topValue = type === 'mm' ? 60 : 24
  return time >= topValue ? convertTimeToString(0) : convertTimeToString(time)
}

function convertTimeToString(value: number) {
  return value < 10 ? `0${value}` : `${value}`
}
</script>

<template>
  <div class="flex gap-2 items-center">
    <p class="text-sm">Начало</p>
    <UFormGroup class="w-20">
      <USelectMenu :options="hours" v-model="props.schedule.start.hh" />
    </UFormGroup>
    <UFormGroup class="w-20">
      <USelectMenu :options="minutes" v-model="props.schedule.start.mm" />
    </UFormGroup>
  </div>
  <div class="flex gap-2 items-center">
    <p class="text-sm">Конец</p>
    <UFormGroup class="w-20">
      <USelectMenu :options="endHours" v-model="props.schedule.end.hh" />
    </UFormGroup>
    <UFormGroup class="w-20">
      <USelectMenu :options="endMinutes" v-model="props.schedule.end.mm" />
    </UFormGroup>
  </div>
</template>

<style></style>
