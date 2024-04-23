<script setup lang="ts">
import type { ScheduleProperty } from '~/scheme/z_program'
const props = defineProps<{
  property: ScheduleProperty
  isTimeEqual: boolean
}>()

const endHours = computed(calcEndHours)
const endMinutes = computed(calcEndMinutes)

const isHoursEqual = () => props.property.end.hh == props.property.start.hh
const isEndMinutesOverStart = () => props.property.end.mm <= props.property.start.mm
const isEndHourOverStart = () => props.property.end.hh <= props.property.start.hh
const isStartHourValueLast = () => props.property.start.hh === '23'
const isStarMinutesValueLast = () => props.property.start.mm === '55'

const watchStartHour = () => {
  props.property.end.hh = isEndHourOverStart() ? increaseTime(1, 'start', 'hh') : props.property.end.hh
  props.property.end.mm = isEndMinutesOverStart() && isHoursEqual() ? increaseTime(30, 'end', 'mm') : props.property.end.mm
  if (isHoursEqual() && isStarMinutesValueLast()) props.property.end.hh = increaseTime(1, 'start', 'hh')
}

const watchStartMinutesAndEndHour = () => {
  props.property.end.mm = isEndMinutesOverStart() && isHoursEqual() ? increaseTime(5, 'start', 'mm') : props.property.end.mm
  if (isStarMinutesValueLast() && isHoursEqual()) props.property.end.hh = increaseTime(1, 'end', 'hh')
}

watch(() => props.property.start.hh, watchStartHour)
watch([() => props.property.start.mm, () => props.property.end.hh], watchStartMinutesAndEndHour)

function calcEndHours() {
  const h = hours.filter((h) => {
    if (isStartHourValueLast()) return h
    else if (isStarMinutesValueLast()) return h > props.property.start.hh
    else return h >= props.property.start.hh
  })
  if (h.length <= 3) h.push('00')
  return h
}

function calcEndMinutes() {
  return isHoursEqual() ? minutes.filter((m) => m > props.property.start.mm) : minutes
}

function increaseTime(inc: number, key1: 'start' | 'end', key2: 'mm' | 'hh') {
  const value = props.property[key1][key2]
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
        <USelectMenu :options="hours" v-model="props.property.start.hh" />
      </UFormGroup>
      <UFormGroup class="w-20">
        <USelectMenu :options="minutes" v-model="props.property.start.mm" />
      </UFormGroup>
    </div>
    <div class="flex items-center gap-2">
      <p class="text-sm">Конец</p>
      <UFormGroup class="w-20">
        <USelectMenu :options="endHours" v-model="props.property.end.hh" />
      </UFormGroup>
      <UFormGroup class="w-20">
        <USelectMenu :options="endMinutes" v-model="props.property.end.mm" />
      </UFormGroup>
    </div>
    <UFormGroup label="Повтор" :ui="{ wrapper: 'flex flex-grow justify-end items-center gap-2' }">
      <UToggle v-model="property.isReplay" class="mt-0.5" />
    </UFormGroup>
  </li>
</template>
