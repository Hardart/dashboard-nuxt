<script setup lang="ts">
import type { InputSize } from '#ui/types'
const title = defineModel({ required: true })
defineProps<{
  label: string
  required?: boolean
  name: string
  icon?: string
  autofocus?: boolean
  description?: string
  size?: InputSize
  type?: 'text' | 'password' | 'email'
}>()
</script>

<template>
  <UFormGroup :label class="w-full" :required :name :description>
    <UInput v-model="title" :autofocus :icon autocomplete="off" :size :type />
  </UFormGroup>
</template>
