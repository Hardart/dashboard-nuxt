<script setup lang="ts">
const toggle = defineModel({ required: true })
</script>

<template>
  <UFormGroup
    label="Повтор"
    :ui="{
      wrapper: 'flex flex-grow justify-end items-center gap-3',
      label: { base: 'text-xs' },
      container: 'mt-0'
    }"
  >
    <UToggle v-model="toggle" size="xs" class="mt-0.5" />
  </UFormGroup>
</template>
