<script setup lang="ts">
import type { User } from '~/scheme/z_user'

const userId = defineModel({ required: true })
defineProps<{ hosts: User[] }>()
</script>

<template>
  <UFormGroup label="Ведущие" class="w-1/5 min-w-48" required name="userId">
    <USelectMenu
      v-model="userId"
      :options="hosts"
      value-attribute="id"
      option-attribute="fullName"
      placeholder="Выбрать ведущего"
      multiple
    />
  </UFormGroup>
</template>
