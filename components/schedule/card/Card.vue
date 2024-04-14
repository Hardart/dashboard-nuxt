<script setup lang="ts">
import type { ProgramSchedulePropsItem } from '~/scheme/z_program'
const selectedWeekdayIds = defineModel<number[]>('ids', { required: true })
const isTimeEqual = defineModel<boolean>('time', { required: true })
const scheduleInfoState = defineModel<Record<string, ProgramSchedulePropsItem[]>>('info', { required: true })

defineEmits(['onAdd'])
</script>

<template>
  <UCard>
    <template #header>
      <ScheduleCardHeader v-model="selectedWeekdayIds" v-model:time="isTimeEqual" />
    </template>
    <ScheduleCardBody v-model:info="scheduleInfoState" v-model:time="isTimeEqual" v-model="selectedWeekdayIds" />
    <template #footer>
      <UButton label="Добавить" :disabled="!selectedWeekdayIds.length" @click="$emit('onAdd', scheduleInfoState)" />
    </template>
  </UCard>
</template>
