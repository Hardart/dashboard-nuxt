<script setup lang="ts">
import { useProgramsStore } from '@/store/useProgramStore'
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel :width="800">
      <DashboardNavbar title="Добавить новостю" :btn="{ label: 'Назад', icon: 'i-heroicons-arrow-long-left-16-solid' }" />
      <UDashboardPanelContent> </UDashboardPanelContent>
    </UDashboardPanel>
    {{ selectedScheduleDays }}
  </UDashboardPage>
</template>
