<script setup lang="ts">
import type { ProgramForTable, ProgramSchedulePropsItem } from '~/scheme/z_program'

defineEmits(['on-edit'])
const props = defineProps<{
  ui?: {
    class?: string
    style?: string
  }
  program: ProgramForTable
}>()
const showInfo = ref(false)
const CELL_HEIGHT = 30
const CELL_WIDTH = 120
const MINUTES_DIVIDER = 60 / CELL_HEIGHT
const getHH = (prop: ProgramSchedulePropsItem, type: 'start' | 'end' = 'start') => parseInt(prop[type].hh)
const getMM = (prop: ProgramSchedulePropsItem, type: 'start' | 'end' = 'start') =>
  parseInt(prop[type].mm) / MINUTES_DIVIDER

const WIDTH = (width: number) => CELL_WIDTH * width
const TOP = (prop: ProgramSchedulePropsItem) => CELL_HEIGHT * getHH(prop) + getMM(prop)
const HEIGHT = (prop: ProgramSchedulePropsItem) =>
  CELL_HEIGHT * ((getHH(prop, 'end') || 24) - getHH(prop)) + getMM(prop, 'end') - getMM(prop)
const LEFT = (startFromId: number) => 80 + (startFromId - 1) * CELL_WIDTH
</script>

<template>
  <div
    v-for="prop in program.props"
    v-bind="{ ...ui, ...$attrs }"
    class="group/edit absolute grid place-items-center rounded-md"
    :class="program.color"
    :style="`width:${WIDTH(program.width)}px; height: ${HEIGHT(prop)}px; top: ${TOP(prop)}px; left: ${LEFT(program.startFromId)}px;background: ${program.color}`"
  >
    <div
      class="absolute right-1 top-1 grid size-3 place-items-center rounded-full bg-zinc-800 text-xs font-bold"
      v-if="prop.isReplay"
    ></div>
    <div class="absolute left-1 top-1 hidden gap-1 group-hover/edit:flex">
      <UButton
        icon="heroicons:cog-6-tooth"
        variant="ghost"
        color="white"
        size="2xs"
        @click="$emit('on-edit', program)"
      />
    </div>
    <div class="group relative grid place-items-center">
      <UAvatar
        class="drop-shadow-md"
        :class="showInfo && 'outline outline-2'"
        :src="program.image || '/logo.svg'"
        size="xs"
        @mouseenter="showInfo = true"
        @mouseleave="showInfo = false"
      />
    </div>
    <UCard
      v-if="showInfo"
      class="absolute z-10 min-w-40 whitespace-nowrap bg-neutral-100/90 bg-cover bg-center bg-no-repeat bg-blend-screen group-hover:block dark:bg-blend-multiply"
      :class="[
        LEFT(program.startFromId) >= 900 && '-right-12',
        WIDTH(program.width) <= 120 && LEFT(program.startFromId) < 120 && '-left-12',
        TOP(prop) < 90 ? 'top-[150%]' : 'bottom-[120%]'
      ]"
      :style="`background-image: url(${program.image})`"
      :ui="{
        body: { padding: 'p-3 sm:px-4 sm:py-3' },
        header: { padding: 'p-3 sm:px-4 sm:py-3' }
      }"
    >
      <template #header>
        <h3 class="text-sm font-semibold">{{ program.title }}</h3>
      </template>
      <!-- <img :src="program.image" class="absolute inset-0 bg-blend-multiply" alt="" /> -->
      <!-- <div v-if="program.isReplay" class="leading-2 absolute bottom-1 right-1.5 text-xs">повтор</div> -->

      <p class="whitespace-nowrap text-sm">Начало в {{ prop.start.hh }}: {{ prop.start.mm }}</p>
      <p class="whitespace-nowrap text-sm">Конец в {{ prop.end.hh }}: {{ prop.end.mm }}</p>
    </UCard>
  </div>
</template>

<style></style>
