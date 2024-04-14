<script setup lang="ts">
const selectedWeekdayIds = defineModel<number[]>({ required: true })
const isTimeEqual = defineModel<boolean>('time', { required: true })
const onWeekdayBtn = (ids: number[]) => (selectedWeekdayIds.value = ids)
</script>
<template>
  <div header class="flex">
    <div class="space-y-4">
      <ScheduleCardCheckboxList v-model="selectedWeekdayIds" />
      <ScheduleCardHelpButtonList @on-click="onWeekdayBtn" />
    </div>
    <UFormGroup label="Единое время" class="ml-auto text-center">
      <UToggle v-model="isTimeEqual" />
    </UFormGroup>
  </div>
</template>
