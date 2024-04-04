<script setup lang="ts">
const { programs } = useProgramsStore().storeRefs()

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
  <ProgramsTable
    :programs="programs || []"
    :loading="false"
    :delete-handle="remove"
  />
</template>
