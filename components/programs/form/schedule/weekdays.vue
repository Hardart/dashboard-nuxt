<script setup lang="ts">
import type { Weekday } from '~/scheme/z_program'

defineProps<{
  isCustomMode: boolean
  weekdays: Weekday[]
  onChange: (id: number) => void
}>()
</script>

<template>
  <div class="flex justify-center gap-5 p-4 ring-1 rounded-lg relative mb-4" v-if="isCustomMode">
    <UCheckbox
      v-for="(day, index) in weekdays"
      :ui="{ base: 'w-5 h-5', label: 'text-base capitalize' }"
      :label="day.title.short"
      v-model="day.selected"
      @change="onChange(day.id)"
    />
  </div>
</template>

<style></style>
