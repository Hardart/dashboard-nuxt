<script setup lang="ts">
type EditProgramFn = (p: Program) => void
import { PROGRAM_STATE } from '~/enums/programsEnum'
import type { Program } from '~/scheme/z_program'
defineProps<{ program: Program }>()
const edit = tryInject<EditProgramFn>(PROGRAM_STATE.EDIT)
</script>

<template>
  <div class="absolute left-1 top-1 hidden gap-1 group-hover/edit:flex">
    <UButton icon="heroicons:cog-6-tooth" variant="ghost" color="white" size="2xs" @click="edit(program)" />
  </div>
</template>
