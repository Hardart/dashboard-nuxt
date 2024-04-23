<script setup lang="ts">
import { SCHEDULE_STATE } from '~/enums/scheduleEnum'

const isTimeEqual = useState(SCHEDULE_STATE.TIME)
</script>
<template>
  <div header class="flex">
    <div class="space-y-4">
      <ScheduleCardCheckboxList />
      <ScheduleCardHelpButtonList />
    </div>
    <UFormGroup label="Единое время" class="ml-auto text-center">
      <UToggle v-model="isTimeEqual" />
    </UFormGroup>
  </div>
</template>
