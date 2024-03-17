<script setup lang="ts">
const isPublished = defineModel({ required: true, type: Boolean })
defineProps<{
  label: string
  required?: boolean
  formName: string
}>()
</script>

<template>
  <UFormGroup :label="label" requried :name="formName">
    <UToggle v-model="isPublished" class="my-1" size="lg" />
  </UFormGroup>
</template>
