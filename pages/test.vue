<script setup lang="ts">
const src = ref('')
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel :resizable="{ min: 200, max: 500 }">
      <UDashboardPanelContent>
        <UFormGroup label="Название программы">
          <UInput />
        </UFormGroup>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style></style>
