<script setup lang="ts">
import type { Schedule } from '~/scheme/z_program'

const { addPropertyToSchedule, isTimeEqual } = useSchedule()
const [showAddBtn, toggleShowBtnState] = useToggle(false)
const props = defineProps<{ schedule: Schedule }>()

const onAddInfo = () => props.schedule.properties.push(addPropertyToSchedule())
const onRemoveInfo = () => props.schedule.properties.pop()
</script>
<template>
  <div
    class="border-primary relative rounded-lg border-2 p-5"
    @mouseenter="toggleShowBtnState(true)"
    @mouseleave="toggleShowBtnState(false)"
  >
    <ScheduleCardWeekdayLabel :ids="schedule.weekdayIds" />
    <ul>
      <ScheduleCardTime v-for="property in schedule.properties" :property :isTimeEqual />
    </ul>
    <div class="absolute -bottom-4 space-x-6" v-if="showAddBtn">
      <ScheduleCardAddBtn @click="onAddInfo" />
      <ScheduleCardRemoveBtn @click="onRemoveInfo" :show-if="schedule.properties.length > 1" />
    </div>
  </div>
</template>
