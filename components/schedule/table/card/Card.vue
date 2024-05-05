<script setup lang="ts">
import type { Program, ScheduleProperty } from '~/scheme/z_program'
import type { INearDayProp } from '~/types'
const [isOpenTitleInfo, toggleTitleInfo] = useToggle()
const [isReplay, toggleIsReplay] = useToggle()
const props = defineProps<{
  program: Program
  property: ScheduleProperty
  size: INearDayProp
}>()

const CELL_HEIGHT = 30
const CELL_WIDTH = 120
const MINUTES_DIVIDER = 60 / CELL_HEIGHT

const getHH = (type: 'start' | 'end') => parseInt(props.property[type].hh)
const getMM = (type: 'start' | 'end') => parseInt(props.property[type].mm) / MINUTES_DIVIDER

const WIDTH = computed(() => CELL_WIDTH * props.size?.width)
const TOP = computed(() => CELL_HEIGHT * getHH('start') + getMM('start'))
const HEIGHT = computed(() => CELL_HEIGHT * ((getHH('end') || 24) - getHH('start')) + getMM('end') - getMM('start'))
const LEFT = computed(() => 80 + (props.size?.startFromId - 1) * CELL_WIDTH)
</script>

<template>
  <div
    class="group/edit absolute grid place-items-center rounded-md"
    :style="`width:${WIDTH}px; height: ${HEIGHT}px; top: ${TOP}px; left: ${LEFT}px; background-color: ${program.color}`"
  >
    <ScheduleTableCardReplayIcon
      :is-replay="property.isReplay"
      @on-enter="toggleIsReplay(true)"
      @on-leave="toggleIsReplay(false)"
    />
    <ScheduleTableCardEditBtn :program />
    <ScheduleTableCardHoverReplay :is-open="isReplay" :style="{ LEFT, TOP, WIDTH }" />
    <div class="group relative grid place-items-center">
      <UAvatar
        class="drop-shadow-md"
        :class="isOpenTitleInfo && 'outline outline-2'"
        :src="correctImageSrc(program.image)"
        size="xs"
        @mouseenter="toggleTitleInfo(true)"
        @mouseleave="toggleTitleInfo(false)"
      />
      <ScheduleTableCardHoverTitle :program :is-open="isOpenTitleInfo" :style="{ LEFT, TOP, WIDTH }" />
    </div>
  </div>
</template>
