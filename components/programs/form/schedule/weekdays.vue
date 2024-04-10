<script setup lang="ts">
import { weekdays } from '@/utils/schedule'
defineProps<{
  isCustomMode: boolean
}>()

defineEmits(['onChange'])
</script>

<template>
  <div class="relative mb-4 flex justify-center gap-5 rounded-lg p-4 ring-1" v-if="isCustomMode">
    <UCheckbox
      v-for="day in weekdays"
      :ui="{ base: 'w-5 h-5', label: 'text-base capitalize' }"
      :label="day.title.short"
      :modelValue="weekdays.includes(day)"
      @change="$emit('onChange', day.id)"
    />
  </div>
</template>

<style></style>
