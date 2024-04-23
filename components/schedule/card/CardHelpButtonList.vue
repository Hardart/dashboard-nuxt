<script setup lang="ts">
import { SCHEDULE_STATE } from '~/enums/scheduleEnum'

const ids = useState(SCHEDULE_STATE.IDS)

const props = [
  { label: 'Каждый день', color: 'sky', emit: () => weekdayIds },
  { label: 'По будням', color: 'sky', emit: () => weekdayIds.slice(0, 5) },
  { label: 'По выходным', color: 'sky', emit: () => weekdayIds.slice(-2) },
  { label: 'По четным', color: 'sky', emit: () => weekdayIds.filter((day) => day % 2 == 0) },
  { label: 'По нечетным', color: 'sky', emit: () => weekdayIds.filter((day) => day % 2 !== 0) },
  { label: 'Сбросить', color: 'orange', emit: () => [] }
]
</script>

<template>
  <div buttons class="flex gap-2">
    <ScheduleCardHelpButton v-for="prop in props" :label="prop.label" :color="prop.color" @click="ids = prop.emit()" />
  </div>
</template>
