<script setup lang="ts">
const isPublished = defineModel({ required: true, type: Boolean })
defineProps<{
  label: string
  required?: boolean
  name: string
}>()
</script>

<template>
  <UFormGroup :label="label" requried :name="name">
    <UToggle v-model="isPublished" class="my-1" size="lg" />
  </UFormGroup>
</template>
