<script setup lang="ts">
import type { ProgramForTable } from '~/scheme/z_program'

defineProps<{
  programsForTable: ProgramForTable[]
}>()
</script>

<template>
  <div v-for="schedule in programsForTable">
    <ScheduleTableCardInfo v-for="info in schedule.props" :info :program="schedule" />
  </div>
</template>
