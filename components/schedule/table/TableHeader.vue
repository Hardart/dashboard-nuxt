<script setup lang="ts">
import { weekday } from '@/utils/schedule'
</script>
<template>
  <div class="z-30 flex h-8 border-b-2 border-zinc-700 bg-zinc-600">
    <div v-for="i in 8" class="grid flex-grow place-items-center capitalize first:w-20 first:flex-grow-0 first:opacity-0">
      {{ weekday(i - 1).short }}
    </div>
  </div>
</template>
