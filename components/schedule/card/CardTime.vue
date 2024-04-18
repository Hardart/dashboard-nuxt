<script setup lang="ts">
import type { ProgramSchedulePropsItem } from '~/scheme/z_program'
const props = defineProps<{
  info: ProgramSchedulePropsItem
  isTimeEqual: boolean
}>()

const endHours = computed(calcEndHours)
const endMinutes = computed(calcEndMinutes)

const isHoursEqual = () => props.info.end.hh == props.info.start.hh
const isEndMinutesOverStart = () => props.info.end.mm <= props.info.start.mm
const isEndHourOverStart = () => props.info.end.hh <= props.info.start.hh
const isStartHourValueLast = () => props.info.start.hh === '23'
const isStarMinutesValueLast = () => props.info.start.mm === '55'

const watchStartHour = () => {
  props.info.end.hh = isEndHourOverStart() ? increaseTime(1, 'start', 'hh') : props.info.end.hh
  props.info.end.mm = isEndMinutesOverStart() && isHoursEqual() ? increaseTime(30, 'end', 'mm') : props.info.end.mm
  if (isHoursEqual() && isStarMinutesValueLast()) props.info.end.hh = increaseTime(1, 'start', 'hh')
}

const watchStartMinutesAndEndHour = () => {
  props.info.end.mm = isEndMinutesOverStart() && isHoursEqual() ? increaseTime(5, 'start', 'mm') : props.info.end.mm
  if (isStarMinutesValueLast() && isHoursEqual()) props.info.end.hh = increaseTime(1, 'end', 'hh')
}

watch(() => props.info.start.hh, watchStartHour)
watch([() => props.info.start.mm, () => props.info.end.hh], watchStartMinutesAndEndHour)

function calcEndHours() {
  const h = hours.filter((h) => {
    if (isStartHourValueLast()) return h
    else if (isStarMinutesValueLast()) return h > props.info.start.hh
    else return h >= props.info.start.hh
  })
  if (h.length <= 3) h.push('00')
  return h
}

function calcEndMinutes() {
  return isHoursEqual() ? minutes.filter((m) => m > props.info.start.mm) : minutes
}

function increaseTime(inc: number, key1: 'start' | 'end', key2: 'mm' | 'hh') {
  const value = props.info[key1][key2]
  const time = (typeof value === 'number' ? value : parseInt(value)) + inc
  const topValue = key2 === 'mm' ? 60 : 24
  return time >= topValue ? convertTimeToString(0) : convertTimeToString(time)
}

function convertTimeToString(value: number) {
  return value < 10 ? `0${value}` : `${value}`
}
</script>

<template>
  <li class="border-primary-700 relative mb-2 flex gap-8 rounded border p-4 last:mb-0">
    <div class="flex items-center gap-2">
      <p class="text-sm">Начало</p>
      <UFormGroup class="w-20">
        <USelectMenu :options="hours" v-model="props.info.start.hh" />
      </UFormGroup>
      <UFormGroup class="w-20">
        <USelectMenu :options="minutes" v-model="props.info.start.mm" />
      </UFormGroup>
    </div>
    <div class="flex items-center gap-2">
      <p class="text-sm">Конец</p>
      <UFormGroup class="w-20">
        <USelectMenu :options="endHours" v-model="props.info.end.hh" />
      </UFormGroup>
      <UFormGroup class="w-20">
        <USelectMenu :options="endMinutes" v-model="props.info.end.mm" />
      </UFormGroup>
    </div>
    <UFormGroup label="Повтор" :ui="{ wrapper: 'flex flex-grow justify-end items-center gap-2' }">
      <UToggle v-model="info.isReplay" class="mt-0.5" />
    </UFormGroup>
  </li>
</template>
