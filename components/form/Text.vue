<script setup lang="ts">
const title = defineModel({ required: true })
defineProps<{
  label: string
  required?: boolean
  formName: string
}>()
</script>

<template>
  <UFormGroup :label="label" class="w-full" :required="required" :name="formName">
    <UInput v-model="title" autofocus />
  </UFormGroup>
</template>
