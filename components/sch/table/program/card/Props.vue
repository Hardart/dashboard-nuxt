<script setup lang="ts">
const [isOpenTitleInfo, toggleTitleInfo] = useToggle()
const props = defineProps<{
  startTime: string
  duration: string
  dayId: number
  color: string
  isRepeat: boolean
  imageUrl?: string
  title: string
}>()

const CELL_HEIGHT = 30
const CELL_WIDTH = 96
const MINUTES_DIVIDER = 60 / CELL_HEIGHT

const startHour = computed(() => parseInt(props.startTime.split(':')[0]))
const startMinute = computed(() => parseInt(props.startTime.split(':')[1]) / MINUTES_DIVIDER)
const durationHour = computed(() => parseInt(props.duration.split(':')[0]))
const durationMinute = computed(() => parseInt(props.duration.split(':')[1]) / MINUTES_DIVIDER)

const WIDTH = computed(() => CELL_WIDTH)
const TOP = computed(() => CELL_HEIGHT * startHour.value + startMinute.value)
const HEIGHT = computed(() => CELL_HEIGHT * durationHour.value + durationMinute.value)
const LEFT = computed(() => 64 + (props.dayId - 1) * CELL_WIDTH)
</script>

<template>
  <div
    class="group/edit z-2 absolute grid place-items-center rounded-md border-none"
    :style="`width:${WIDTH - 2}px; height: ${HEIGHT - 2}px; top: ${TOP + 1}px; left: ${LEFT + 1}px; background-color: ${color}`"
  >
    <SchTableProgramCardHoverTitle :is-open="isOpenTitleInfo" :title :style="{ LEFT, TOP, WIDTH }" />
    <SchTableProgramCardImage
      :is-open="isOpenTitleInfo"
      :title
      :image-url
      @on-enter="toggleTitleInfo(true)"
      @on-leave="toggleTitleInfo(false)"
    />
    <SchTableProgramCardIsRepeat :is-repeat />
  </div>
</template>
