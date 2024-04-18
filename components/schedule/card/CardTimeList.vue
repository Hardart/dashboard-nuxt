<script setup lang="ts">
import type { ProgramSchedulePropsItem } from '~/scheme/z_program'
const [showAddBtn, toggleShowBtnState] = useToggle(false)
const props = defineProps<{
  ids: number[] | number
  scheduleInfoState: Record<string, ProgramSchedulePropsItem[]>
  isTimeEqual: boolean
}>()

const infoId = computed(() => {
  return typeof props.ids === 'number' ? props.ids : 0
})
defineEmits(['addInfo', 'removeInfo'])
</script>
<template>
  <div
    class="border-primary relative rounded-lg border-2 p-5"
    @mouseenter="toggleShowBtnState(true)"
    @mouseleave="toggleShowBtnState(false)"
  >
    <ScheduleCardWeekdayLabel :ids="typeof ids === 'number' ? [ids] : ids" />
    <ul>
      <ScheduleCardTime v-if="scheduleInfoState[infoId]" v-for="info in scheduleInfoState[infoId]" :info :isTimeEqual />
    </ul>
    <div class="absolute -bottom-4 space-x-6" v-if="showAddBtn">
      <ScheduleCardAddBtn @click="$emit('addInfo', ids)" />
      <ScheduleCardRemoveBtn @click="$emit('removeInfo', ids)" :show-if="scheduleInfoState[infoId].length > 1" />
    </div>
  </div>
</template>
