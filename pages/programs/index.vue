<script setup lang="ts">
const { deleteProgram } = useProgramsStore()
</script>

<template>
  <DashboardNavbar
    title="Программы"
    :btn="{
      label: 'добавить программу',
      icon: 'i-heroicons-plus',
      to: '/programs/add'
    }"
  />
  <div class="flex gap-4">
    <ProgramsTable :loading="false" @delete="deleteProgram" />
  </div>
</template>
