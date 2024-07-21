<script setup lang="ts">
import type { NewProgram } from '~/store/useNewProgramStore'

defineProps<{
  program: NewProgram
}>()
</script>

<template>
  <template v-for="schedule in program.shedules">
    <SchTableProgramCardProps
      v-for="dayId in schedule.dayOfWeekIds"
      :day-id
      :start-time="schedule.startTime"
      :duration="schedule.duration"
      :color="program.color"
      :is-repeat="schedule.isRepeat"
      :title="program.title"
      :image-url="program.imageUrl"
    />
  </template>
</template>
