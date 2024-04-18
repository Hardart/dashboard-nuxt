<script setup lang="ts">
import type { Program, ProgramForTable, ProgramSchedulePropsItem } from '~/scheme/z_program'
import type { INearDayProp } from '~/types'
const showInfo = ref(false)
const props = defineProps<{
  schedule: ProgramForTable
  info: ProgramSchedulePropsItem
  size: INearDayProp
}>()
const edit = inject<(p: ProgramForTable) => void>('edit-program')
if (typeof edit === 'undefined') throw createError("can't inject edit function")
const CELL_HEIGHT = 30
const CELL_WIDTH = 120
const MINUTES_DIVIDER = 60 / CELL_HEIGHT

const getHH = (type: 'start' | 'end') => parseInt(props.info[type].hh)
const getMM = (type: 'start' | 'end') => parseInt(props.info[type].mm) / MINUTES_DIVIDER

const WIDTH = computed(() => CELL_WIDTH * props.size.width)
const TOP = computed(() => CELL_HEIGHT * getHH('start') + getMM('start'))
const HEIGHT = computed(() => CELL_HEIGHT * ((getHH('end') || 24) - getHH('start')) + getMM('end') - getMM('start'))
const LEFT = computed(() => 80 + (props.size.startFromId - 1) * CELL_WIDTH)
</script>

<template>
  <div
    class="group/edit absolute grid place-items-center rounded-md"
    :class="schedule.color"
    :style="`width:${WIDTH}px; height: ${HEIGHT}px; top: ${TOP}px; left: ${LEFT}px; background-color: ${schedule.color}`"
  >
    <div
      class="absolute right-1 top-1 grid size-3 place-items-center rounded-full bg-zinc-800 text-xs font-bold"
      v-if="info.isReplay"
    ></div>
    <div class="absolute left-1 top-1 hidden gap-1 group-hover/edit:flex">
      <UButton icon="heroicons:cog-6-tooth" variant="ghost" color="white" size="2xs" @click="edit(schedule)" />
    </div>
    <div class="group relative grid place-items-center">
      <UAvatar
        class="drop-shadow-md"
        :class="showInfo && 'outline outline-2'"
        :src="schedule.image || '/logo.svg'"
        size="xs"
        @mouseenter="showInfo = true"
        @mouseleave="showInfo = false"
      />
      <UCard
        v-if="showInfo"
        class="absolute z-10 min-w-40 whitespace-nowrap bg-neutral-100/90 bg-cover bg-center bg-no-repeat bg-blend-screen group-hover:block dark:bg-blend-multiply"
        :class="[LEFT >= 800 && '-right-12', WIDTH <= 120 && LEFT < 120 && '-left-12', TOP < 90 ? 'top-[150%]' : 'bottom-[120%]']"
        :style="`background-image: url(${schedule.image})`"
        :ui="{
          body: { padding: 'p-3 sm:px-4 sm:py-3' },
          header: { padding: 'p-3 sm:px-4 sm:py-3' }
        }"
      >
        <template #header>
          <h3 class="text-sm font-semibold">{{ schedule.title }}</h3>
        </template>
        <!-- <img :src="program.image" class="absolute inset-0 bg-blend-multiply" alt="" /> -->
        <!-- <div v-if="program.isReplay" class="leading-2 absolute bottom-1 right-1.5 text-xs">повтор</div> -->

        <!-- <p class="whitespace-nowrap text-sm">Начало в {{ program.start.hh }}: {{ program.start.mm }}</p> -->
        <!-- <p class="whitespace-nowrap text-sm">Конец в {{ program.end.hh }}: {{ program.end.mm }}</p> -->
      </UCard>
    </div>
  </div>
</template>
