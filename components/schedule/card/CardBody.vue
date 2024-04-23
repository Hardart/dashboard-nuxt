<script setup lang="ts">
import { SCHEDULE_STATE } from '~/enums/scheduleEnum'

const scheduleList = useState(SCHEDULE_STATE.LIST)
</script>
<template>
  <div body class="space-y-8">
    <ScheduleCardTimeList v-for="schedule in scheduleList" :schedule />
  </div>
</template>
