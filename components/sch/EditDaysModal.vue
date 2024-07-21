<script setup lang="ts">
defineProps<{ schedule: NewSchedule }>()
defineEmits(['apply'])
</script>

<template>
  <UCard :ui="{ base: 'flex flex-col h-full flex-grow', body: { base: 'flex-grow' } }">
    <div header class="flex">
      <div class="space-y-4">
        <SchDayPicker :schedule />
        <SchSetDayBtns v-model="schedule.dayOfWeekIds" />
      </div>
    </div>

    <template #footer>
      <UButton label="Применить" :disabled="!schedule.dayOfWeekIds.length" @click="$emit('apply')" />
    </template>
  </UCard>
</template>
