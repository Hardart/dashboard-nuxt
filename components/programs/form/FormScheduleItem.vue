<script setup lang="ts">
import { SCHEDULE_STATE } from '~/enums/scheduleEnum'
import type { Schedule } from '~/scheme/z_program'
const { selectedIdsToWeekday, setScheduleTimeString } = useSchedule()
defineProps<{
  schedule: Schedule
  idx: number
}>()
const edit = tryInject<(id: number) => void>(SCHEDULE_STATE.EDIT)
const remove = tryInject<(id: number) => void>(SCHEDULE_STATE.DELETE)
</script>

<template>
  <li class="border-primary group relative my-2 rounded-lg border-2 p-2" v-if="schedule.weekdayIds.length">
    <h4>{{ selectedIdsToWeekday(schedule.weekdayIds) }}</h4>
    <ul class="flex gap-2">
      <li v-for="info in schedule.properties" class="relative mt-1">
        <p class="border-primary/60 rounded-lg border px-3 py-2 text-sm leading-3">
          {{ setScheduleTimeString(info) }}
        </p>
        <div v-if="info.isReplay" class="absolute -top-1.5 right-2 text-xs">п</div>
      </li>
    </ul>
    <div class="absolute right-2 top-2 hidden flex-col group-hover:flex">
      <UButton size="2xs" color="emerald" variant="ghost" icon="heroicons:pencil-square-16-solid" @click="edit(idx)" />
      <UButton size="2xs" color="red" variant="ghost" icon="heroicons:trash-solid" @click="remove(idx)" />
    </div>
  </li>
</template>
