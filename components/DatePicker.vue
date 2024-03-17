<script setup lang="ts">
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
const date = defineModel({ required: true, type: Date })

const formatDate = computed(() =>
  Intl.DateTimeFormat('ru', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(
    new Date(date.value)
  )
)

// const breakpoints = useBreakpoints(breakpointsTailwind)
// const smallerThanSm = breakpoints.smaller('sm')

const attrs = ref([
  {
    highlight: {
      color: 'green',
      fillMode: 'solid',
    },
    dates: new Date(),
  },
])

const rules = ref({
  minutes: { interval: 5 },
})
</script>

<template>
  <div>
    <VDatePicker
      v-model="date"
      mode="dateTime"
      :attributes="attrs"
      :rules="rules"
      hide-time-header
      :min-date="new Date()"
      is24hr
      is-dark="system"
    >
      <template #default="{ togglePopover }">
        <UButton @click="togglePopover" :label="formatDate" />
      </template>
    </VDatePicker>
  </div>
</template>
