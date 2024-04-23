<script setup lang="ts">
import { weekdayIds } from '@/utils/schedule'
</script>

<template>
  <div class="h-m relative flex w-full overflow-y-auto">
    <ScheduleTableTime />
    <ScheduleTableDay v-for="day in weekdayIds" :day />
    <ScheduleTableCardList />
  </div>
</template>
