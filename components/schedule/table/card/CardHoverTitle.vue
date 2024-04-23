<script setup lang="ts">
import type { Program } from '~/scheme/z_program'

defineProps<{
  isOpen: boolean
  program: Program
  style: {
    LEFT: number
    TOP: number
    WIDTH: number
    HEIGHT?: number
  }
}>()
</script>
<template>
  <UCard
    v-if="isOpen"
    class="absolute z-10 whitespace-nowrap bg-neutral-100/90 bg-cover bg-center bg-no-repeat bg-blend-screen group-hover:block dark:bg-blend-multiply"
    :class="[
      style.LEFT >= 800 && '-right-12',
      style.WIDTH <= 120 && style.LEFT < 120 && '-left-12',
      style.TOP < 90 ? 'top-[150%]' : 'bottom-[140%]'
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

    <!-- <p class="whitespace-nowrap text-sm">Начало в {{ program.start.hh }}: {{ program.start.mm }}</p> -->
    <!-- <p class="whitespace-nowrap text-sm">Конец в {{ program.end.hh }}: {{ program.end.mm }}</p> -->
  </UCard>
</template>
