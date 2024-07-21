<script setup lang="ts">
const toggleValue = defineModel<boolean>({ required: true })
defineProps<{
  label: string
  required?: boolean
  name?: string
  size?: 'lg' | 'xs' | 'xl'
}>()
</script>

<template>
  <UFormGroup :label requried :name>
    <UToggle v-model="toggleValue" class="my-1" :size />
  </UFormGroup>
</template>
