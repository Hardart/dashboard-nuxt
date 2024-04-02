<script setup lang="ts">
import type { ResponseApi } from '~/types/fetch'

const { data } = await useCustomFetch<ResponseApi.ProgramList>('/program-list')
const programs = data.value?.programs
const remove = (id: string) => console.log(id)
</script>

<template>
  <DashboardNavbar title="Программы" :btn="{ label: 'добавить программу', icon: 'i-heroicons-plus', to: '/programs/add' }" />
  <ProgramsTable :programs="programs || []" :loading="false" :delete-handle="remove" />
</template>
