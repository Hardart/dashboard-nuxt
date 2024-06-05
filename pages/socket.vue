<script setup lang="ts">
interface TestProgram {
  id: number
  class?: string
  style?: string
}
const body = ref<HTMLDivElement>()
const hours = new Array(24).fill('').map((h, index) => index)
const weekdayIds = new Array(7).fill('').map((h, index) => index + 1)
const programs = ref<TestProgram[]>([])
const program = ref<TestProgram>()

const { pressed } = useMousePressed()
const { x, y } = useMouse()
const height = ref(0)
const deltaY = ref(0)
const deltaX = ref(0)
const { left, top } = useElementBounding(body)

const onMouseDown = (e: PointerEvent) => {
  const valueY = e.pageY - top.value
  const valueX = e.pageX - left.value
  deltaY.value = valueY % 5 == 0 ? Math.floor(valueY) : Math.floor(valueY / 10) * 10

  const x = (valueX - 80) % 120
  deltaX.value = x == 0 ? valueX : valueX - x
  program.value = {
    id: programs.value.length || 0,
    style: `top: ${deltaY.value}px; left: ${deltaX.value}px; height: ${height.value}px`
  }
  programs.value.push(program.value)
}

const onMouseMove = () => {
  if (!pressed.value) return
  const value = Math.floor(y.value - top.value - deltaY.value)

  height.value = value % 5 == 0 ? value : height.value
  // height.value = value
  programs.value[programs.value.length - 1].style = `top: ${deltaY.value}px; left: ${deltaX.value}px; height: ${height.value}px`
}

const onMouseUp = () => {
  height.value = 0
}

const refs = ref()
const onClickProgram = (id: number) => {
  console.log(refs.value[id].elem)
}
</script>

<template>
  <div class="m-2 flex w-max select-none flex-col overflow-hidden border-4 border-zinc-700">
    <!-- HEADER -->
    <div class="z-30 flex h-8 border-b-2 border-zinc-700 bg-zinc-600">
      <div v-for="i in 8" class="grid flex-grow place-items-center first:w-20 first:flex-grow-0 first:opacity-0">
        {{ i - 1 }}
      </div>
    </div>
    <!-- BODY -->
    <div class="relative z-0 flex h-full w-full overflow-y-auto" ref="body">
      <TestTableTime :hours="hours" />
      <TestTableDay
        v-for="day in weekdayIds"
        :day="day"
        :hours="hours"
        @pointerdown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
      />
      <!-- <TestProgram v-for="program in programsForSchedule" :program="program" /> -->
      <TestDragSchedule
        v-for="program in programs"
        :ui="{ class: program.class, style: program.style }"
        :key="program.id"
        @pointerdown.capture.stop="onClickProgram(program.id)"
        ref="refs"
      />
    </div>
  </div>
</template>
