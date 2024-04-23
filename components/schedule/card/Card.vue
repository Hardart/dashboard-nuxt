<script setup lang="ts">
import { SCHEDULE_STATE } from '~/enums/scheduleEnum'

const ids = useState<number[]>(SCHEDULE_STATE.IDS)
const save = tryInject<VoidFunction>(SCHEDULE_STATE.SAVE)
const cancel = tryInject<VoidFunction>(SCHEDULE_STATE.CANCEL)
</script>

<template>
  <UCard :ui="{ base: 'flex flex-col h-full flex-grow', body: { base: 'flex-grow' } }">
    <template #header>
      <ScheduleCardHeader />
    </template>
    <ScheduleCardBody />
    <template #footer>
      <UButton label="Сохранить" @click="save" :disabled="!ids.length" />
      <UButton label="Отменить" @click="cancel" />
    </template>
  </UCard>
</template>
