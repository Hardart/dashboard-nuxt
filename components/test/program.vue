<script setup lang="ts">
interface PTest {
  id: number
  weekdayId: number
  start: {
    hh: string,
    mm: string
  },
  end: {
    hh: string,
    mm: string
  },
}
const programBounds = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
}
const props = defineProps<{
  ui?: {
    class?: string
    style?: string
  }
  program: PTest
}>()

  programBounds.width = 120 * props.program.weekdayId
  const startPosY = 60 * parseInt(props.program.start.hh)+ parseInt(props.program.start.mm)
  const height = 60 * (parseInt(props.program.end.hh) - parseInt(props.program.start.hh)) + parseInt(props.program.end.mm) - parseInt(props.program.start.mm)
  programBounds.top = startPosY
  programBounds.height = height
  programBounds.left = 80
</script>

<template>
  <div v-bind="{ ...ui, ...$attrs }" class="absolute w-16 bg-zinc-500" :style="`width:${programBounds.width}px; height: ${programBounds.height}px; top: ${programBounds.top}px; left: ${programBounds.left}px`">
    <p class="text-sm">Начало в {{ program.start.hh }}: {{ program.start.mm }}</p>
    <p class="text-sm">Конец в {{ program.end.hh }}: {{ program.end.mm }}</p>
  </div>
</template>

<style></style>
