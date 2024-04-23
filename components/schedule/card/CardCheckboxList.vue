<script setup lang="ts">
import type { Schedule } from '~/scheme/z_program'
import { weekdayIds } from '@/utils/schedule'
const { ids, scheduleList, isTimeEqual, addPropertyToSchedule } = useSchedule()

const onChange = (weekId: number) => {
  if (ids.value.includes(weekId)) {
    ids.value = ids.value.filter((id) => id !== weekId)
  } else ids.value.push(weekId)
  ids.value.sort()
}

watch(
  ids,
  () => {
    if (isTimeEqual.value) {
      if (scheduleList.value.length) {
        const scheduleSchema = scheduleList.value[0]
        scheduleSchema.weekdayIds = ids.value
        scheduleSchema.sizes = combineNearDays(ids.value)
        scheduleList.value[0] = scheduleSchema
      } else {
        if (!ids.value.length) return
        const sizes = combineNearDays(ids.value)
        const properties = [addPropertyToSchedule()]
        scheduleList.value.push({ sizes, properties, weekdayIds: ids.value })
      }
    } else {
      separateTime()
    }
  },
  { deep: true }
)

watch(isTimeEqual, () => {
  scheduleList.value = []
  const list = toValue(scheduleList)

  if (isTimeEqual.value) {
    if (!ids.value.length) return
    const sizes = combineNearDays(ids.value)
    const properties = [addPropertyToSchedule()]
    list[0] = { sizes, properties, weekdayIds: ids.value }
  } else {
    const scheduleArray = ids.value.map<Schedule>((id) => ({
      properties: [addPropertyToSchedule()],
      weekdayIds: [id],
      sizes: [{ startFromId: id, width: 1 }]
    }))
    list.push(...scheduleArray)
  }
})

function separateTime() {
  for (let index = 1; index <= 7; index++) {
    if (ids.value.includes(index) && !scheduleList.value.some((sch) => sch.weekdayIds.includes(index))) {
      const scheduleSchema = {
        properties: [addPropertyToSchedule()],
        weekdayIds: [index],
        sizes: [{ startFromId: index, width: 1 }]
      }
      scheduleList.value.push(scheduleSchema)
    } else if (!ids.value.includes(index)) {
      const idx = scheduleList.value.findIndex((sch) => sch.weekdayIds.includes(index))
      if (idx !== -1) scheduleList.value.splice(idx, 1)
    }
  }
  scheduleList.value.sort((a, b) => a.weekdayIds[0] - b.weekdayIds[0])
}
</script>

<template>
  <div class="flex gap-8">
    <UCheckbox
      v-for="day in weekdayIds"
      :ui="{ base: 'w-5 h-5', label: 'text-sm capitalize' }"
      :label="weekday(day).short"
      :modelValue="ids.includes(day)"
      @change="onChange(day)"
    />
  </div>
</template>
