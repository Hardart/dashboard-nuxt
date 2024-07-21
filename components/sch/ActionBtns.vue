<script setup lang="ts">
defineProps<{
  props: { color: string; icon: string; onClick: (schedule: NewSchedule, index: number) => void }[]
  schedule: NewSchedule
  idx: number
}>()
</script>

<template>
  <div class="absolute -top-3 right-3 space-x-2">
    <UButton
      v-for="{ color, icon, onClick } in props"
      :icon
      :color
      @click="onClick(schedule, idx)"
      variant="outline"
      size="2xs"
    />
  </div>
</template>
