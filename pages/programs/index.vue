<script setup lang="ts">
const remove = (id: string) => console.log(id)
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
    <ProgramsTable :loading="false" :delete-handle="remove" />
    <!-- <ScheduleTable v-if="programs" :programs /> -->
  </div>
</template>
