<script setup lang='ts'>
import type { ProgramSchedule } from '~/scheme/z_program';
interface Cell {
  el:HTMLDivElement
  width: number
  height: number
  top: number
  left: number
}
interface ProgramBounds {
  width: number,
  height: number,
  top: number,
  left: number,
}
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
const hours = new Array(24).fill("").map((h, index) => index)
const weekdays = new Array(7).fill("").map((h, index) => index)

const cells = ref<Cell[]>()

const programs = ref<PTest[]>([])
  const createProgram = (sh: string, sm: string, eh: string, em: string ) => ({
  dayId: [],
  start: {
    hh: sh,
    mm: sm
  },
  end: {
    hh: eh,
    mm: em
  },
  isReplay: false
})

const onClickCell = () => {
  const p = createProgram('12', '00', '14', '40')
  programs.value.push({id: programs.value.length, weekdayId:7,  start: p.start, end: p.end})
  const p2 = createProgram('15', '15', '16', '30')
  programs.value.push({id: programs.value.length, weekdayId:5,  start: p2.start, end: p2.end})
  const p3 = createProgram('10', '30', '11', '30')
  programs.value.push({id: programs.value.length, weekdayId:1,  start: p3.start, end: p3.end})
}
</script>
 
<template>
  <div class="m-2 flex flex-col w-max border-4 border-zinc-700 overflow-hidden select-none">
    <!-- HEADER -->
    <div class="flex h-8 bg-zinc-600 border-b-2 border-zinc-700 z-30">
      <div v-for="i in 8" class="flex-grow grid place-items-center first:w-20 first:flex-grow-0 first:opacity-0">{{ i - 1 }}</div>
    </div>
    <!-- BODY -->
    <div class="relative flex w-full h-full overflow-y-auto z-0">
      <div class="w-20">
        <div class="h-[60px] grid place-items-center border-t border-zinc-700" v-for="hour in hours">{{ hour }}:00</div>
      </div>
      <div class="flex-grow last:border-r first:border-t-0" v-for="i in weekdays">
        <TestTableCell v-for="hour in hours" :index="hour" :dayIndex="i" ref="cells"/>
      </div>
      <!-- <div class="absolute bg-sky-700" ></div> -->
      <TestProgram v-for="program in programs" :program="program" />
    </div>
  </div>
  <div>
    <UButton label="Добавить" @click="onClickCell"/>
  </div>

</template>