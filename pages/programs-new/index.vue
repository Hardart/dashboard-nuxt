<script setup lang="ts">
import { useNewProgramsStore } from '~/store/useNewProgramStore'

const { storeRefs, editProgram, deleteProgram } = useNewProgramsStore()
const { programs } = storeRefs()
</script>

<template>
  <DashboardNavbar
    title="Программы"
    :btn="{
      label: 'добавить программу',
      icon: 'i-heroicons-plus',
      to: '/programs-new/new'
    }"
  />
  <ul class="m-4 flex gap-6">
    <li v-for="program in programs" class="group relative cursor-pointer select-none" @click="editProgram(program)">
      <UButton
        class="absolute -top-3 right-3 hidden group-hover:block"
        @click.stop="deleteProgram(program)"
        color="red"
        size="2xs"
        icon="heroicons:trash-20-solid"
      />
      <UCard :ui="{ background: 'hover:dark:bg-zinc-950/30' }">
        <template #header>
          <img :src="correctImageSrc(program.imageUrl)" class="rounded-xl" width="200" height="200" alt="" />
        </template>
        <h3>{{ program.title }}</h3>
      </UCard>
    </li>
  </ul>
</template>
