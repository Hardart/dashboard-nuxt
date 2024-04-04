<script setup lang="ts">
interface TestProgram {
  id: number
  class?: string
  style?: string
}
const programs = ref<TestProgram[]>([])
const program = ref<TestProgram>()
const { pressed } = useMousePressed()
const { x, y } = useMouse()
const height = ref(0)
const deltaY = ref(0)
const deltaX = ref(0)
const onMouseDown = (e: PointerEvent) => {
  deltaY.value = e.pageY
  deltaX.value = e.pageX
  program.value = {
    id: programs.value.length + 1,
    style: `top: ${deltaY.value}px; left: ${deltaX.value}px; height: ${height.value}px`
  }
  programs.value.push(program.value)
}
const onMouseMove = () => {
  if (!pressed.value) return
  const value = (deltaY.value - y.value) * -1
  // height.value = value % 5 == 0 ? value : height.value
  height.value = value
  programs.value[programs.value.length - 1].style =
    `top: ${deltaY.value}px; left: ${deltaX.value}px; height: ${height.value}px`
}

const onMouseUp = () => {
  height.value = 0
}

const refs = ref()
const onClickProgram = (id: number) => {
  // console.log(programs.value[program.value!.id])
  program.value = programs.value.find((p) => p.id === id)
  if (!program.value) return
  program.value.class = 'w-32 bg-zinc-800'
  console.log(refs.value)
}
</script>

<template>
  <div
    class="m-2 h-96 w-full max-w-4xl border border-zinc-700"
    @pointerdown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
  >
    <TestProgram
      v-for="program in programs"
      :ui="{ class: program.class, style: program.style }"
      :key="program.id"
      @pointerdown.capture.stop="onClickProgram(program.id)"
      ref="refs"
    />
  </div>
</template>
