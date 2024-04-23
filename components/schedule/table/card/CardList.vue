<script setup lang="ts">
import { PROGRAM_STATE } from '~/enums/programsEnum'
import type { Program } from '~/scheme/z_program'
const { scheduleList } = useSchedule()
const programs = tryInject<Program[]>(PROGRAM_STATE.LIST)
const programFormData = tryInject<Program>(PROGRAM_STATE.FORM_DATA)
</script>

<template>
  <ul>
    <li v-for="program in programs">
      <template v-for="schedule in program.schedule">
        <template v-for="size in schedule.sizes">
          <ScheduleTableCard v-for="property in schedule.properties" :size :property :program />
        </template>
      </template>
    </li>

    <li v-for="schedule in programFormData.schedule">
      <template v-for="size in schedule.sizes">
        <ScheduleTableCard v-for="property in schedule.properties" :size :property :program="programFormData" />
      </template>
    </li>

    <li v-for="schedule in scheduleList">
      <template v-for="size in schedule.sizes">
        <ScheduleTableCard v-for="property in schedule.properties" :size :property :program="programFormData" />
      </template>
    </li>
  </ul>
</template>
