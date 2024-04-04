<script setup lang="ts">
const { getProgramList } = useProgramsStore()
getProgramList()
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style></style>
